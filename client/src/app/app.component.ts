import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './pushNotification.service';

const VAPID_PUBLIC =
  'BOE-XacVFcrxu2VYblJmt5Lch7Lr6xyqbsCp67xGTc8yvnrEXBQ3NamvcyK8aa12csJJiw9ivW8J1szZ5mPgx4I';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-push-notifications';

  constructor(swPush: SwPush, pushService: PushNotificationService) {
    if (swPush.isEnabled) {
      swPush.subscription.subscribe(subscription => {
        console.log('>>>>>>>>>>>>>>>>>>>>', subscription);
      });
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })
        .catch(console.error);
    }
  }
}
