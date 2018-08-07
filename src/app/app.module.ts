import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserImagesComponent} from './components/user-images/user-images.component';
import {AppRootComponent} from './components/app-root/app-root.component';
import {UserMenuComponent} from './components/user-menu/user-menu.component';
import {UploadPostsComponent} from './components/upload-posts/upload-posts.component';
import {LanguageSwitcherComponent} from './components/language-switcher/language-switcher.component';
import {UserMainComponent} from './components/user-main/user-main.component';
import {EnterUserComponent} from './components/enter-user/enter-user.component';
import {UserSearchComponent} from './components/user-search/user-search.component';
import {NavSearchComponent} from './components/nav-search/nav-search.component';
import {UserFriendsComponent} from './components/user-friends/user-friends.component';
import {UserMessageComponent} from './components/user-message/user-message.component';
import {UserMessageSendComponent} from './components/user-message-send/user-message-send.component';
import {UserNotificationComponent} from './components/user-notification/user-notification.component';
import {WallComponent} from './components/wall/wall.component';
import {WallPostsComponent} from './components/wall-posts/wall-posts.component';
import {UserViewComponent} from './components/user-view/user-view.component';
import {UserMenuAdaptComponent} from './components/user-menu-adapt/user-menu-adapt.component';
import {GalleryImagesComponent} from './components/gallery-images/gallery-images.component';
import {SliderComponentComponent} from './components/slider-component/slider-component.component';
import {LocalisationPipe} from './pipes/localisation.pipe';
import {UsersSearchPipe} from './pipes/users-search.pipe';
import {DateFormatPipe} from './pipes/dateFormat.pipe';
import {LocalisationServices} from './services/localisation.services';
import {DatabaseServices} from './services/database.services';
import {UsersServices} from './services/users.services';
import {SearchServices} from './services/search.services';
import {WebsoketService} from './services/websoket.service';
import {AddFriendServices} from './services/addFriend.services';
import {UserMessagesServices} from './services/userMessages.services';
import {PostsServices} from './services/posts.services';
import {UploadImagesServices} from './services/uploadImages.services';
import {GalleryImages} from './services/gallery-images';
import {SliderServices} from './services/slider.services';
import {NotificationServices} from './services/notification.services';


import {AppRouterModule} from './modules/router/router.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuards} from './modules/guards/auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        UserImagesComponent,
        AppRootComponent,
        UserMenuComponent,
        UploadPostsComponent,
        LanguageSwitcherComponent,
        UserMainComponent,
        EnterUserComponent,
        UserSearchComponent,
        NavSearchComponent,
        UserFriendsComponent,
        UserMessageComponent,
        UserMessageSendComponent,
        UserNotificationComponent,
        WallComponent,
        WallPostsComponent,
        UserViewComponent,
        UserMenuAdaptComponent,
        GalleryImagesComponent,
        SliderComponentComponent,
        LocalisationPipe,
        UsersSearchPipe,
        DateFormatPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRouterModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        LocalisationServices,
        DatabaseServices,
        UsersServices,
        SearchServices,
        WebsoketService,
        AddFriendServices,
        UserMessagesServices,
        PostsServices,
        UploadImagesServices,
        GalleryImages,
        SliderServices,
        NotificationServices,
        AuthGuards
    ],
    bootstrap: [AppRootComponent]
})
export class AppModule {
}
