import { Request, Response, NextFunction } from 'express';
import { Message } from '../models/message.model';
import { Controller } from '../interfaces/controller.interface';

export class MessageController implements Controller {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        //#region 
        try {
            const { senderId, chatId, body } = req.body;
            const message = await Message.create({ senderId, chatId, body });
            res.status(201).json({ success: true, data: message });
        } catch (error) {
            next(error);
        }
        //#endregion
    }
    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        //#region 
        try {
            const messages = await Message.find();
            if (!messages) {
                res.status(404).json({ message: "Messages not found" });
            }
            res.status(200).json({ success: true, data: messages });
        } catch (error) {
            next(error);
        }
        //#endregion
    }
    async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
        //#region 
        try {
            const { id } = req.params;
            const message = await Message.findById(id).populate('senderId').populate('chatId');
            if (!message) {
                res.status(404).json({ message: "Message not found" });
            }
            res.status(200).json({ success: true, data: message });
        } catch (error) {
            next(error);
        }
        //#endregion
    }
    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        //#region 
        try {
            const { id } = req.params;
            const { senderId, chatId, body } = req.body;
            const message = await Message.findByIdAndUpdate(id, { senderId, chatId, body }, { new: true });
            res.status(200).json({ success: true, data: message });
        } catch (error) {
            next(error);
        }
        //#endregion
    }

    // ^ Delete messages by IDs
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        //#region 
        try {
            const { id } = req.body;
            const idsToDelete = Array.isArray(id) ? id : [id];
            const deletedMessages = await Message.deleteMany({ _id: { $in: idsToDelete } });
            res.status(200).json({ success: true, data: deletedMessages });
        } catch (error) {
            next(error);
        }
        //#endregion
    }
}
