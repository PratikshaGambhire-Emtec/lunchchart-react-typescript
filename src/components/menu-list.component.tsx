import { ChangeEvent, Component } from "react";
import IMenuData from "../types/menu.type";
import MenuDataService from "../services/menu.service"
import { Link } from "react-router-dom";

type Props={};
type State={
    menu:Array<IMenuData>,
    currentMenu:IMenuData | null,
    currentIndex:number,
    searchDay:string
};
export default class MenusList extends Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.onChangeSearchDay = this.onChangeSearchDay.bind(this);
        this.retrieveMenu = this.retrieveMenu.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMenu = this.setActiveMenu.bind(this);
        this.removeAllDays = this.removeAllDays.bind(this);
        this.searchDay = this.searchDay.bind(this);
        this.state={
            menu:[],
            currentMenu:null,
            currentIndex:-1,
            searchDay:""
        };
    }
    componentDidMount(){
        this.retrieveMenu();
    }
    onChangeSearchDay(e: ChangeEvent<HTMLInputElement>){
        const searchDay = e.target.value;
        this.setState({
            searchDay:searchDay
        });
    }
    retrieveMenu(){
        MenuDataService.getAll()
        .then((response:any)=>{
            this.setState({
                menu:response.data
            })
            console.log(response.data)
        })
        .catch((e: Error)=>{
            console.log(e)
        })
    }
    refreshList(){
        this.retrieveMenu();
        this.setState({
            currentMenu:null,
            currentIndex:-1
        })
    }

    setActiveMenu(menu:IMenuData, index:number ){
        this.setState({
            currentMenu:menu,
            currentIndex:index
        })
    }
    removeAllDays(){
        MenuDataService.deleteAll()
        .then((response:any)=>{
            console.log(response.data);
            this.refreshList();
        })
        .catch((e:Error)=>{
            console.log(e)
        })
    }
    searchDay(){
        this.setState({
            currentMenu:null,
            currentIndex: -1
        });

        MenuDataService.findByDay(this.state.searchDay)
        .then((response:any)=>{
            this.setState({
                menu:response.data
            })
            console.log(response.data)
        })
        .catch((e:Error)=>{
            console.log(e)
        })
    }
    render(){
        const {searchDay, menu, currentMenu, currentIndex} = this.state;
        return(
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input type="text"
                        className="form-control"
                        placeholder="search by Day" 
                        value={searchDay}
                        onChange={this.onChangeSearchDay}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchDay}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Menu List</h4>
                    <ul className="list-group">
                        {menu && 
                        menu.map((menu:IMenuData, index:number)=>(
                            <li
                            className={
                                "list-group-item" +
                                (index === currentIndex ? "active" : "")
                            }
                            onClick={()=> this.setActiveMenu(menu, index)}
                            key={index}
                            >
                                {menu.day}
                            </li>
                        ))}
                    </ul>
                    <button 
                    className="m-3 btn btn-sm btn-danger"
                    onClick={this.removeAllDays}>
                        Remove All
                    </button>
                     </div>

                     <div className="col-md-6">
                         {currentMenu ? (
                             <div>
                                 <h4>MEnu</h4>
                                 <div>
                                     <label>
                                         <strong>Day:</strong>
                                     </label>{" "}
                                     {currentMenu.day}
                                 </div>
                                 <div>
                                     <label >
                                         <strong>itemnames:</strong>
                                     </label>{" "}
                                     {currentMenu.itemnames}
                                 </div>
                                 <div>
                                     <label >
                                         <strong>dessert:</strong>
                                     </label>{" "}
                                     {currentMenu.dessert}
                                 </div>
                                 <div>
                                     <label >
                                         <strong>price:</strong>
                                     </label>{" "}
                                     {currentMenu.price}
                                 </div>
                                 <Link to={"/menu/" + currentMenu.id}
                                 className="badge badge-warning"
                                 >
                                     Edit
                                 </Link>
                             </div>
                         ):(
                             <div>
                                 <br />
                                 <p>Please click on a menu</p>
                             </div>
                         )}

                     </div>
            </div>
        )
    }
}