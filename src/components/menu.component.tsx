import { ChangeEvent, Component } from "react";
import { RouterProps } from "react-router-dom";
import IMenuData from "../types/menu.type";
import MenuDataService from "../services/menu.service";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<RouterProps>;
type State = {
  currentMenu: IMenuData;
  message: string;
};

export default class Menu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeDay = this.onChangeDay.bind(this);
    this.onChangeitemnames = this.onChangeitemnames.bind(this);
    this.onChangeDessert = this.onChangeDessert.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.getMenu = this.getMenu.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
    this.deleteMenu = this.deleteMenu.bind(this);
    this.state={
        currentMenu:{
            id:null,
            day:"",
            itemnames:"",
            dessert:"",
            price:"",
            published: false,
        },
        message:"",
    };  
  }
  componentDidMount(){
      this.getMenu(this.props.match.params.id);
  }
  onChangeDay(e: ChangeEvent<HTMLInputElement>) {
    const day = e.target.value;
    this.setState(function (prevState) {
      return {
        currentMenu: {
          ...prevState.currentMenu,
          day: day,
        },
      };
    });
  }
  onChangeitemnames(e: ChangeEvent<HTMLInputElement>) {
    const itemnames = e.target.value;
    this.setState(function (prevState) {
      return {
        currentMenu: {
          ...prevState.currentMenu,
          itemnames: itemnames,
        },
      };
    });
  }
  onChangeDessert(e: ChangeEvent<HTMLInputElement>) {
    const dessert = e.target.value;
    this.setState(function (prevState) {
      return {
        currentMenu: {
          ...prevState.currentMenu,
          dessert: dessert,
        },
      };
    });
  }
  onChangePrice(e: ChangeEvent<HTMLInputElement>) {
    const price = e.target.value;
    this.setState(function (prevState) {
      return {
        currentMenu: {
          ...prevState.currentMenu,
          price: price,
        },
      };
    });
  }
  getMenu(day:string){
      MenuDataService.get(day)
      .then((response:any)=>{
          this.setState({
              currentMenu: response.data,
          });
          console.log(response.data)
      })
      .catch((e:Error)=>{
        console.log(e);
      })
  } updatePublished(status: boolean) {
    const data: IMenuData = {
      id: this.state.currentMenu.id,
      day: this.state.currentMenu.day,
      itemnames: this.state.currentMenu.itemnames,
      dessert: this.state.currentMenu.dessert,
      price: this.state.currentMenu.price,
      published : status ,
    };
    MenuDataService.update(data, this.state.currentMenu.id)
      .then((response: any) => {
        this.setState((prevState) => ({
          currentMenu: {
            ...prevState.currentMenu,
            published: status,
          },
          message: "The status was updated successfully!"
        }));
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updateMenu() {
    MenuDataService.update(
      this.state.currentMenu,
      this.state.currentMenu.day
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The menu was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  deleteMenu() {
    MenuDataService.delete(this.state.currentMenu.day)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/menu");
      })
      .catch((e: Error) => {
        console.log(e);
      });
    }
    render(){
        const { currentMenu } = this.state;
    return (
      <div>
        {currentMenu ? (
          <div className="edit-form">
            <h4>Menu chart</h4>
            <form>
              <div className="form-group">
                <label htmlFor="day">Day</label>
                <input
                  type="text"
                  className="form-control"
                  id="day"
                  value={currentMenu.day}
                  onChange={this.onChangeDay}
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemnames">Itemnames</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemnames"
                  value={currentMenu.itemnames}
                  onChange={this.onChangeitemnames}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dessert">Dessert</label>
                <input
                  type="text"
                  className="form-control"
                  id="dessert"
                  value={currentMenu.dessert}
                  onChange={this.onChangeDessert}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={currentMenu.price}
                  onChange={this.onChangePrice}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentMenu.published ? "Published" : "Pending"}
              </div>
            </form>
            
            {currentMenu.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMenu}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMenu}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }


    }

