import { Request, Response } from 'express';
import Business, { IBusiness } from '../models/business.model';
import emailService from '../services/email.service'; 


export default {


    // Busca negocios según sector y/o palabra clave
    search: function (req: Request, res: Response) {

        let { sector, keyword } = req.query;

        if (!sector && !keyword) {
            return res.status(400).json({ message: 'Debe proporcionar parámetros de búsqueda' });
        }

        let query = {};

        // Se hace la consulta según los parámetros recibidos
        if (sector !== "Sector…" && keyword) {
            query = {
                $and: [
                    { $or: [
                        { job: { $regex: keyword, $options: "i" } },
                        { name: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } }
                    ]},
                    { sectors: sector }
                ]
            };
        } else if (sector !== "Sector…") {
            query = { sectors: sector };
        } else if (keyword) {
            query = {
                $or: [
                    { job: { $regex: keyword, $options: "i" } },
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            };
        }




        // Busca en la base de datos
        Business.find(query, (err: Error | null, business: IBusiness[]) => {
            if (err) {
                return res.status(500).json({ message: 'Error en la búsqueda' });
            }
            return res.json(business);
        });

    },




     // Lista todos los negocios sin paginación
    list: (req: Request, res: Response) => {
        Business.find((err: Error | null, business: IBusiness[]) => {
            if (err) {
                return res.status(500).json({ message: 'Error obteniendo los negocios' });
            }
            return res.json(business);
        });
    },




     // Lista negocios con paginación
    listPagination: (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const PAGE_SIZE = 20;
        const skip = (page - 1) * PAGE_SIZE;

        Business.countDocuments().then((totalDocs: number) => {
            Business.find()
                .skip(skip)
                .limit(PAGE_SIZE)
                .exec((err: Error | null, data: IBusiness[]) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error obteniendo los negocios' });
                    }
                    return res.json({ totalPages: Math.ceil(totalDocs / PAGE_SIZE), business: data });
                });
        });
    },




    // Obtiene un negocio por ID
    show: (req: Request, res: Response) => {
        const id = req.params.id;

        Business.findOne({ _id: id }, (err: Error | null, business: IBusiness | null) => {
            if (err) {
                return res.status(500).json({ message: 'Error al obtener el negocio' });
            }
            if (!business) {
                return res.status(404).json({ message: 'Negocio no encontrado' });
            }
            return res.json(business);
        });
    },




    // Crea un nuevo negocio y envía correos de notificación
    create: async (req: Request, res: Response) => {
        const business = new Business(req.body);

        business.save((err: Error | null) => {
            if (err) {
                return res.status(500).json({ message: 'Error al añadir el negocio', error: err });
            }
            res.status(201).json({ added: true, message: 'Guardado', id: business.id });
        });




        // EMAIL TO US
        await emailService.sendMail(
            "info.mapamask@cryptospace.es",
            'Mapamask.io | New business',
            'New business',
            'Congrats! A new business has been added to mapamask',
            business.name,
            business.job,
            business.country,
            business.city,
            business.web
        );




        // EMAIL TO BUSINESS OWNER
        await emailService.sendMail(
            business.email,
            'Mapamask.io | Nuevo registro',
            'Nuevo registro',
            'Enhorabuena!!!🎊 has dado tu negocio de alta en mapamask. Que comience la descentralización y el desarrollo de la web3! 🚀',
            business.name,
            business.job,
            business.country,
            business.city,
            business.web
        );
    },




    // Elimina un negocio por ID
    remove: (req: Request, res: Response) => {
        const idToRemove = req.params.id;

        Business.findByIdAndDelete(idToRemove, (err: Error | null, data: IBusiness | null) => {
            if (err) {
                return res.status(500).json({ deleted: false, message: 'No hemos encontrado el negocio' });
            }
            return res.json({ deleted: true, data });
        });
    },




    // Obtiene la cantidad total de negocios
    count: (req: Request, res: Response) => {
        Business.countDocuments({}, (err: Error | null, numOfDocs: number) => {
            if (err) {
                return res.status(500).json({ message: 'Error obteniendo el conteo' });
            }
            return res.json(numOfDocs);
        });
    },




    // Busca negocios por el dueño usando la wallet
    walletSearch: (req: Request, res: Response) => {
        const walletSearch = req.params.wallet;

        Business.find({ owner: walletSearch }, (err: Error | null, business: IBusiness[]) => {
            if (err) {
                return res.status(500).json({ message: 'Error en la búsqueda' });
            }
            return res.json(business);
        });
    },


    

    // Edita un negocio existente
    edit: (req: Request, res: Response) => {
        const editedBusiness: IBusiness = req.body;

        Business.updateOne(
            { _id: editedBusiness._id },
            {
                distance: editedBusiness.distance,
                name: editedBusiness.name,
                images: editedBusiness.images,
                email: editedBusiness.email,
                phone: editedBusiness.phone,
                description: editedBusiness.description,
                sectors: editedBusiness.sectors,
                job: editedBusiness.job,
                latitude: editedBusiness.latitude,
                longitude: editedBusiness.longitude,
                city: editedBusiness.city,
                country: editedBusiness.country,
                web: editedBusiness.web,
                online: editedBusiness.online,
                wallet: editedBusiness.wallet,
                discount: editedBusiness.discount
            },
            (err: Error | null, data: any) => {
                if (err) {
                    return res.status(500).json({ message: 'No hemos encontrado el negocio' });
                }
                return res.json(data);
            }
        );
    }
};
