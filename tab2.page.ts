import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

interface GroceryItem {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  title = "Grocery"

  items: GroceryItem[] = [
    {
      name: "Milk",
      quantity: 2
    },
    {
      name: "Cheese",
      quantity: 3
    },
    {
      name: "Bread",
      quantity: 1
    },
    {
      name: "Banana",
      quantity: 5
    }
  ];
  alertController: any;

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController) {}

  async removeItem(item: GroceryItem, index: any) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item -' + index + " ...",
      duration: 3000 
    });
    (await toast).present();

    this.items.splice(index, 1);
  }

  async editItem(item: GroceryItem, index: any) {
    console.log("Editing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item -' + index + " ...",
      duration: 3000 
    });
    (await toast).present();
    this.showEditItemPrompt(item, index);

  }

  addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
  }

  async showAddItemPrompt() {
    const prompt = await this.alertCtrl.create({
      header: 'Add Item',
      message: 'Please enter item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
        },
        {
          name: 'quantity',
          type: 'text',
          placeholder: 'Quantity',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Prompt canceled');
          },
        },
        {
          text: 'Save',
          handler: (item: any) => {
            console.log('Save clicked', item);
            this.items.push(item);
          },
        },
      ],
    });
  
    (await prompt).present();
  }

  async showEditItemPrompt(item: { name: any; quantity: any; }, index: any) {
    const prompt = await this.alertCtrl.create({
      header: 'Edit Item',
      message: 'Please edit item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item.name
        },
        {
          name: 'quantity',
          type: 'text',
          placeholder: 'Quantity',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Prompt canceled');
          },
        },
        {
          text: 'Save',
          handler: (item: any) => {
            console.log('Save clicked', item);
            this.items[index] = item;
          },
        },
      ],
    });
  
    (await prompt).present();
  }
}
  