import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { interval, tap } from 'rxjs';

const client1 = {
  name: 'Armando',
  gender: 'male',
  age: 25,
  address: '123 Main St',
}

const client2 = {
  name: 'Melisa',
  gender: 'female',
  age: 20,
  address: '123 Main St',
}

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UncommonPageComponent {
  //i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  }

  changeClient(){
    if(this.client() === client1){
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }

  //I18n Plural
  clientsMap = signal({
    '=0': 'No tenemos ningun cliente esperando',
    '=1': 'Tenemos un cliente esperando',
    '=2': 'Tenemos 2 clientes esperando',
    'other': 'Tenemos # clientes esperando',
  })

  clients = signal([
    'Maria','Pedro','Armando','Melisa','Natalia','Andrea','Juan','Carlos'
  ]);

  deleteClient(){
    this.clients.update(prev => prev.slice(1));
  }

  //KeyValuePipe
  profile = {
    name: 'Juan',
    age: 30,
    address: '123 Main St',
  }

  //Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise Value')
      // reject('Tenemos un error')
    }, 3500);
  })

  myObservableTimer = interval(2000).pipe(
    tap((value) => console.log('Timer: ', value)),
  )
}
