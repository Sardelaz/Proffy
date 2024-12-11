import { Request, Response } from 'express';

import db from '../database/connection';

import convertHourToMinute from '../utils/convertHourToMinutes';

// Definindo valores que antes o typescript não lia
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string
}   

export default class ClassesController {

    // Listar Classes
    async index(request: Request, response: Response) {
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        // Se não completar todos campos de busca cai no seguinte cenário
        if (!filters.week_day || !filters.subject || !filters.time) {
        response.status(400).json({
            error: 'Missing filters to search classes'
        });
        }

        try {
            // Converssão de horas para minutos
            const timeInMinutes = convertHourToMinute(time);

          const classes = await db('classes') // Inicia uma consulta na tabela 'classes'
    .whereExists(function () { // Filtra as aulas que possuem horários compatíveis na tabela 'class_schedule'
        this.select('class_schedule.*') // Seleciona todos os campos da tabela 'class_schedule'
            .from('class_schedule') // Define a tabela 'class_schedule' como alvo da subconsulta
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') 
            // Garante que os registros de 'class_schedule' estejam relacionados à aula atual (relacionamento entre class_id e id)

            .whereRaw('`class_schedule`.`week_day` = ?', [Number(week_day)]) 
            // Filtra pelo dia da semana (week_day) fornecido, convertendo-o para número

            .whereRaw('`class_schedule`.`from` <= ?', [timeInMinutes]) 
            // Garante que o horário de início da aula (from) seja menor ou igual ao horário atual (em minutos)

            .whereRaw('`class_schedule`.`to` > ?', [timeInMinutes]); 
            // Garante que o horário de término da aula (to) seja maior que o horário atual (a aula ainda está em andamento)
            })
            .where('classes.subject', '=', subject) 
            // Filtra as aulas pela matéria especificada no parâmetro 'subject'

            .join('users', 'classes.user_id', '=', 'users.id') 
            // Realiza a junção com a tabela 'users' para obter as informações do professor associado à aula

            .select(['classes.*', 'users.*']); 
            // Seleciona todos os campos de 'classes' e 'users' para incluir os dados das aulas e dos professores


            response.json(classes);
         
        } catch (error) {
            // Se a listagem de classes não for completa cai no seguinte cenário
            console.error('[ClassesController] Error while listing classes:', error);

            response.status(500).json({
                error: 'Unexpected error while searching for classes. Please try again later.',
            });
        }
    };

    // Criar Classes
    async create(request: Request, response: Response) {
        const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

        // Se faltar algum campo na criação de classes cai no seguinte cenário
        if (!name || !avatar || !whatsapp || !bio || !subject || !cost || !schedule) {
            response.status(400).json({
                error: 'Os campos (name, avatar, whatsapp, bio, subject, cost, schedule) são obrigatorios.',
            });
        }

        const trx = await db.transaction();

        try {

            // Insere um novo usuário na tabela 'users' e retorna o ID do usuário inserido
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });

            const user_id = insertedUsersIds[0]; // Obtém o ID do usuário recém-inserido

            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });

            const class_id = insertedClassesIds[0];

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinute(scheduleItem.from),
                    to: convertHourToMinute(scheduleItem.to),
                };
            });

            await trx('class_schedule').insert(classSchedule);

            await trx.commit();

            response.status(201).json({
                message: 'Class criada',
            });
        } catch (error) {
            console.error('[ClassesController] Erro ao criar class:', error);

            await trx.rollback();

            response.status(400).json({
                error: 'Unexpected error while creating a new class. Please try again later.',
            });
        }
    };
}
