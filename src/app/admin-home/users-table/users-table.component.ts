import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';
import { UserRoles } from 'src/app/core/constants/userRoles';
import { IUserSignup } from 'src/app/core/models/user/user';
import { Paginator } from './utils/paginator';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  @Input() users:IUserSignup[] = []
  tableHeader:string[] = []
  private userList:string[][]=[]
   displayUsers:string[][]=[]
  page:number=1;
  itemsPerPage:number=10;
 
  //faccio una paginazione di 10 elementi per pagina 

  constructor() { }

  ngOnInit(): void {
   this.tableHeader = this.createTableHeaderList(this.users);
   this.userList=this.createUsersList();
   this.displayUsers=this.changePage(this.page)
  }


  //TODO rimuovi 
  get tableHeaders(){
    if(!this.users.length) return []
    const set = new Set();
    this.users.forEach(user=>{
      const keys = _.keys(user)
      keys.forEach(k=>set.add(k))
    })
    return Array.from(set)
  }

  createTableHeaderList(users:IUserSignup[]):string[]{
    if(!this.users.length) return []
    const set = new Set();
    this.users.forEach(user=>{
      const keys = _.keys(user)
      keys.forEach(k=>set.add(k))
    })
    return Array.from(set) as string[]
  }

  createUsersList():string[][]
  {
    let usersData:string[][]=[];
    return this.users.map(user=>{
       let userData:string[]=[]
      this.tableHeader.map(header=>{
        if(header in user){
          const prop = (user[header as keyof IUserSignup] || 'USER') as keyof typeof UserRoles;
          userData.push(prop);
        }
      })
      usersData.push(userData)

      return userData
    })
  }

  changePage(page:number){
     if(page>Math.ceil(this.userList.length/this.itemsPerPage) || page<0){
      return this.displayUsers
     }  

      const nextPage = Paginator.extractPages(this.userList,this.itemsPerPage,page)
      return nextPage;
  }


  onClickPage(page:number){
    this.displayUsers= this.changePage(page);
  }
  
  get pages(){
     let pags = Math.ceil(this.userList.length/this.itemsPerPage) ,i;
      let p= []
     for(i=1;i<=pags;i++){
         p.push(i);
     }
     return p
  }


}
