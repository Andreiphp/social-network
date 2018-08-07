import {CommentInterfaces} from './comment-interfaces';

export interface UserMessage {
    id: number;
    name: string;
    lastname: string;
    img: string;
    message: string;
    friend: number;
    date: Date;
}

export interface UserPosts {
    comment: Array<CommentInterfaces>;
    date: string;
    from_user_id: number;
    id: number;
    image: string;
    img: string;
    lastname: string;
    name: string;
    post_text: string;
    user_id: number;
}