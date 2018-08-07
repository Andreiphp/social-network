import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserMainComponent} from '../../components';
import {LocalisationServices} from '../../services/localisation.services';
import {EnterUserComponent} from '../../components/enter-user/enter-user.component';
import {AuthGuards} from '../guards/auth.guard';
import {UserSearchComponent} from '../../components/user-search/user-search.component';
import {WallComponent} from '../../components/wall/wall.component';
import {SearchServices} from '../../services/search.services';
import {UserFriendsComponent} from '../../components/user-friends/user-friends.component';
import {UserMessageComponent} from '../../components/user-message/user-message.component';
import {UserMessageSendComponent} from '../../components/user-message-send/user-message-send.component';
import {UsersServices} from '../../services/users.services';
import {UserViewComponent} from '../../components/user-view/user-view.component';
import {UserImagesComponent} from '../../components/user-images/user-images.component';


const childrenRoutes: Routes = [
    {
        path: 'profile/:id', component: WallComponent, resolve: {
            required: UsersServices
        }
    },
    {
        path: 'search/:name', component: UserSearchComponent, resolve: {
            required: SearchServices
        }
    },
    {path: 'view/profile/:id', component: UserViewComponent},
    {path: 'friends', component: UserFriendsComponent},
    {path: 'message', component: UserMessageComponent},
    {path: 'room/:id', component: UserMessageSendComponent},
    {path: 'images', component: UserImagesComponent}
];
const routes: Routes = [
    {
        path: '', component: EnterUserComponent
    },
    {
        path: 'user', component: UserMainComponent, canActivate: [AuthGuards], children: childrenRoutes, resolve: {
            required: LocalisationServices
        }
    },

    {
        path: '**', redirectTo: '/', pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]

})
export class AppRouterModule {
}
