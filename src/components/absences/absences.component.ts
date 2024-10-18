import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.css'
})
export class AbsencesComponent {
  userAgentInfo:string=''

  get browerInfo(){

    let info = ''
    info+= navigator.userAgentData?.platform.toString()+'\n';

    navigator.userAgentData?.brands.forEach(brand => {
      info += `Brand: ${brand.brand}, Version: ${brand.version}\n`;
    })

    if(navigator.userAgentData?.mobile){
      info+='Mobile'+'\n';
    }


    console.log(info);

    return info;
  }

  get agentInfo(){
    return navigator.userAgent;
  }


  // get browerInfo(){

  //   let navigator=window.navigator as any;
  //   let info = ''
  //   info+= navigator.userAgentData?.platform.toString()+'\n';

  //   navigator.userAgentData?.brands.forEach((brand: { brand: string; version: string }) => {
  //     info += `Brand: ${brand.brand}, Version: ${brand.version}\n`;
  //   })

  //   if(navigator.userAgentData?.mobile){
  //     info+='Mobile'+'\n';
  //   }


  //   console.log(info);

  //   return info;
  // }


}
