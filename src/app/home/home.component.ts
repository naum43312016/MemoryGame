import { Component, OnInit } from '@angular/core';
import { faCoffee,faPhone,faAmbulance,faAddressBook,faAd,faAngry } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faCoffee = faCoffee;
  faPhone = faPhone;
  faAd=faAd;
  faAddressBook=faAddressBook;
  faAmbulance=faAmbulance;
  faAngry=faAngry;
  desk=[];
  moves=0;
  cards=12;
  solCards=[];
  array = [];
  iconsArr=[faCoffee,faPhone,faAd,faAddressBook,faAmbulance,faAngry];
  fMove=null;
  constructor(private router:Router) { }

  ngOnInit() {
    this.initDesk();
  }

  initDesk(){
    var j=0;
    for(let i=0;i<this.iconsArr.length;i++){
      var ic = this.iconsArr[i];
      this.array[j]={
        icon:ic,
        name:ic.iconName
      };
      j++;
      this.array[j]={
        icon:ic,
        name:ic.iconName
      };
      j++;
    }
    this.shuffle(this.array)
    console.log(this.array)
  }
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  restartGame(){
    this.moves=0;
    this.cards=12;
    this.solCards=[];
    this.array = [];
    this.initDesk();
  }

  onIconClick(event){
    if(this.fMove==null){//is first move
        if(this.solCards.indexOf(event.toElement.attributes[2].value)<0){
          event.target.childNodes[0].style.visibility="visible";
          event.toElement.style.background="#02b3e4"
          this.fMove={
          index:event.toElement.attributes[2].value,
          event:event
          };
        }
    }else{
      if(this.solCards.indexOf(event.toElement.attributes[2].value)<0 && this.fMove.index!==event.toElement.attributes[2].value){
        event.target.childNodes[0].style.visibility="visible";
        event.toElement.style.background="#02b3e4";
        var fIcon=this.array[this.fMove.index].name;
        var secIndex = event.toElement.attributes[2].value;
        var sIcon = this.array[secIndex].name;
        setTimeout(
          ()=>{
            if(fIcon===sIcon){
              this.cards=this.cards-2;
              this.solCards.push(secIndex);
              this.solCards.push(this.fMove.index);
              event.target.childNodes[0].style.visibility="hidden";
              this.fMove.event.target.childNodes[0].style.visibility="hidden";
              event.toElement.style.background="linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%)";
              this.fMove.event.toElement.style.background="linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%)";
              this.fMove=null;
              if(this.cards<2){
                alert("Winner");
                this.restartGame();
              }
            }else{
              event.target.childNodes[0].style.visibility="hidden";
              this.fMove.event.target.childNodes[0].style.visibility="hidden";
              event.toElement.style.background="#16A085";
              this.fMove.event.toElement.style.background="#16A085";
              this.fMove=null;
            }
          },400
        );
        this.moves++;
      }
    }

    
  }

}
