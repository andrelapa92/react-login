import api from "./api";

class UsersService{
    
    getAll(){
        return api.get("/users");
    }

    get(id){
        return api.get(`/users/${id}`);
    }

    create(user){
        return api.post("/users", user);
    }

    update(id, user){
        return api.put(`/users/${id}`, user);
    }

    delete(id){
        return api.delete(`/users/${id}`);
    }

}

export default new UsersService();