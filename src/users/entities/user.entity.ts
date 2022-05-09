import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    // primary && auto generated column
    @PrimaryGeneratedColumn()
    id: number;

    // strings
    @Column()
    username: string;
    @Column()
    password: string;

    // auto generated data columns when created && updated
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    
}
