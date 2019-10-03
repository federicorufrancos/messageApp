import { Controller, Post, Get, Body, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDto } from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {

    // injecting the service/repository
    constructor(private mensajesService: MensajesService) { }

    @Post()
    create(@ Body() createMensajeDto: CreateMensajeDto, @Res() response) {
        this.mensajesService.createMensaje(createMensajeDto).then( mensaje => {
            response.status(HttpStatus.CREATED).json(mensaje);
        }).catch(() =>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la creación del mensaje'});
        });
    }

    @Get()
    getAll(@Res() response) {
        this.mensajesService.getAll().then(mensajesList => {
            response.status(HttpStatus.OK).json(mensajesList);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la obtención de los mensajes'});
        });
    }

    @Put(':id')    // :id indicates the element to be udated
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje) {
        this.mensajesService.updateMensaje(idMensaje, updateMensajeDto).then( mensajeActualizado => {
            response.status(HttpStatus.OK).json(mensajeActualizado);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la edición del mensaje'});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje) {
        this.mensajesService.deleteMensaje(idMensaje).then(res => {
            response.status(HttpStatus.OK).json(res);
        }).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la eliminación del mensaje'});
        });
    }
}
