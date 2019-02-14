import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from 'socket.io-client';

@Injectable()

export class ChatService{
    private socket = io('http://localhost:4000');

    joinRoom(data){
        this.socket.emit('join',data);
    }
    sendMessage(room,data){
        this.socket.emit('chat', room,{
            id: data.id,
            sender_id : data.senderid,
            sujet_id: data.sujet_id,
            message: data.message,
            date: data.date,
            username: data.username,
            image: data.image
        })
    }
    newMessageReceived(){
        let observable = new Observable<{
            id:number,
            sender_id:number,
            sujet_id:number,
            message:string,
            date:Date,
            username:string,
            image:string}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }
}