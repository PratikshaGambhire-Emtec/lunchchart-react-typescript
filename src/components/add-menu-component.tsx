import { ChangeEvent, Component } from "react";
import IMenuData from "../types/menu.type";
import  MenuDataService from "../services/menu.service"

type Props ={};

type State= IMenuData & {
    submitted: boolean
}

export default class AddMenuChart extends Component<Props, State>{
    constructor(props:Props){
        super(props);

        this.onChangeDay=this.onChangeDay.bind(this);
        this.onChangeItemlist=this.onChangeItemlist.bind(this);
        this.onChangeDessert=this.onChangeDessert.bind(this);
        this.onChangePrice=this.onChangePrice.bind(this);
        this.saveMenu = this.saveMenu.bind(this);
        this.newMenu = this.newMenu.bind(this);
        this.state={
            id:null,
            day:"",
            itemnames:"",
            dessert:"",
            price:"",
            published: false,
            submitted:false
        };
    }
    onChangeDay(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
          day: e.target.value
        });
    }
        onChangeItemlist(e: ChangeEvent<HTMLInputElement>) {
            this.setState({
              itemnames: e.target.value
            });
        }
            onChangeDessert(e: ChangeEvent<HTMLInputElement>) {
                this.setState({
                  dessert: e.target.value
                });
            }
                onChangePrice(e: ChangeEvent<HTMLInputElement>) {
                    this.setState({
                      price: e.target.value
                    });
                }

                saveMenu(){
                    const data:IMenuData={
                        day: this.state.day,
                        itemnames:this.state.itemnames,
                        dessert:this.state.dessert,
                        price:this.state.price
                    };
                    MenuDataService.create(data)
                    .then((response:any)=>{
                        this.setState({
                            id:response.data.id,
                            day:response.data.day,
                            itemnames:response.data.itemnames,
                            dessert:response.data.dessert,
                            price:response.data.price,
                            submitted:true
                        })
                        console.log(response.data);
                    })
                    .catch((e:Error)=>{
                        console.log(e);
                    })
                }
                newMenu(){
                    this.setState({
                        id:null,
                        day:"",
                        itemnames:"",
                        dessert:"",
                        price:"",
                        submitted:false
                    })
                }

                render(){
                    const { submitted, day, itemnames,dessert,price} = this.state;
               return(
                   <div className="submit-form">
                       {submitted ? (
                           <div>
                               <h4>You submitted successfully! </h4>
                               <button className="btn btn-success" onClick={this.newMenu}>
                                   Add
                               </button>
                           </div>
                       ):(
                           <div>
                               <div className="form-group">
                                   <label htmlFor="day">Day</label>
                                    <input type="text"
                                    className="form-control"
                                    id='day'
                                    required
                                    value={day}
                                    onChange={this.onChangeDay}
                                    name="day"
                                    />
                               </div>
                               <div className="form-group">
                                   <label htmlFor="itemnames">itemnames</label>
                                    <input type="text"
                                    className="form-control"
                                    id='itemnames'
                                    required
                                    value={itemnames}
                                    onChange={this.onChangeItemlist}
                                    name="itemnames"
                                    />
                               </div>
                               <div className="form-group">
                                   <label htmlFor="dessert">dessert</label>
                                    <input type="text"
                                    className="form-control"
                                    id='dessert'
                                    required
                                    value={dessert}
                                    onChange={this.onChangeDessert}
                                    name="dessert"
                                    />
                               </div>
                               <div className="form-group">
                                   <label htmlFor="price">price</label>
                                    <input type="text"
                                    className="form-control"
                                    id='price'
                                    required
                                    value={price}
                                    onChange={this.onChangePrice}
                                    name="price"
                                    />
                               </div>
                               <button onClick={this.saveMenu} className = "btn btn-success">
                                    Submit
                               </button>
                               
                           </div>
                       )}

                   </div>
               )
                }
}