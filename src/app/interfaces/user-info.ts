export interface UserInfo {
    name: string;
    lastname: string;
    id: number;
    img: string;
}

export interface UserFriends {
    friends_id: number;
    friends_img: string;
    friends_lastname: string;
    friends_name: string;
    id: number;
    status: number;
    user_id: number;
}
