import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Post } from './Post';

enum SocialType {
    'Facebook',
    'Apple',
    'Google'
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    firstname: string;

    @Column({ nullable: true })
    lastname: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    isActive: boolean;

    @Column({ nullable: true })
    profile_pic: string;

    @Column({ nullable: true, unique: true })
    social_id: string;

    @Column({ nullable: true })
    provider: SocialType;

    @OneToMany(type => Post, (post) => post.user)
    posts: Post[];
}
