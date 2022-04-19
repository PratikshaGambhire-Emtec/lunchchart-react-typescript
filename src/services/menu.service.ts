import http from "../http-commom";
import IMenuData from "../types/menu.type";

class MenuDataService{
getAll(){
    return http.get<Array<IMenuData>>("/menuchart")
}

get(day:string){
    return http.get<IMenuData>(`/menuchart/${day}`);
}

create(data: IMenuData) {
    return http.post<IMenuData>("/menuchart", data);
  }

  update(data: IMenuData, day: string) {
    return http.put<string>(`/menuchart/${day}`, data);
  }

  delete(day: string) {
    return http.delete<string>(`/menuchart/${day}`);
  }

  deleteAll() {
    return http.delete<any>(`/menuchart`);
  }

  findByDay(Day: string) {
    return http.get<Array<IMenuData>>(`menuchart=${Day}`);
  }


}
export default new MenuDataService();