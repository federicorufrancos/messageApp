import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { CreateMensajeDto } from './dto/create-mensaje-dto';

@Injectable()
export class MensajesService {

    constructor(
        @InjectRepository(Mensaje)// entity to be used
        private readonly mensajeRepository: Repository<Mensaje>,
    ) { }

    async getAll(): Promise<Mensaje[]> {
        // find get all the elements
        return await this.mensajeRepository.find();
    }

    async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje> {
        const nuevo = new Mensaje();
        nuevo.mensaje = mensajeNuevo.mensaje;
        nuevo.nick = mensajeNuevo.nick;
        return await this.mensajeRepository.save(nuevo);
    }

    async updateMensaje(id: number, mensajeActualizar: CreateMensajeDto): Promise<Mensaje> {
        const mensajeUpdate = await this.mensajeRepository.findOne(id);
        mensajeUpdate.mensaje = mensajeActualizar.mensaje;
        mensajeUpdate.nick = mensajeActualizar.nick;

        return this.mensajeRepository.save(mensajeUpdate);
    }

    async  deleteMensaje(idMensaje: number): Promise<any> {
        return await this.mensajeRepository.delete(idMensaje);
    }
}
