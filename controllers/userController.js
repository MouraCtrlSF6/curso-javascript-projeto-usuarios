class UserController{
    constructor(formId, tbodyId){
        this.formEl = document.querySelectorAll(`#${formId} input`);
        this.tbodyEl = document.getElementById(tbodyId);
        this.formEl = document.getElementById(formId);
        this.onSubmit();
    }

    onSubmit(){
        this.formEl.addEventListener('submit', event=>{
            event.preventDefault();
            let myValues = this.values;
            myValues.photo = "";
            this.getPhoto(content => {
                myValues.photo = content;
                this.addLine(myValues, this.tbodyEl);  
            });
        });
    }
    addLine(dataUser, tbodyEl){  
        tbodyEl.innerHTML += `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>  
            <td>${dataUser.birth}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>`;
    }
    getPhoto(callback){
        let fileReader = new FileReader();
        let elements = [...this.formEl.elements].filter(item => {
             if(item.name == 'photo') return item;
        });
        let file = elements[0].files[0];
        fileReader.onload = () => {
            callback(fileReader.result)
        };
        fileReader.readAsDataURL(file);
    }
    get values(){
        let user = {};
        //Necessário uso de spread: obj => Array
        //Exemplo: [] => Operador de array
        //Exemplo: [item0, item1, item1] = array
        //Exemplo: [...items] => Um array com um número indefinido de itens;
        [...this.formEl.elements].forEach(currentField => {
            if(currentField.name === 'gender'){
                if(currentField.checked){
                    user[currentField.name] = currentField.id;
                }
            }
            else {  
                user[currentField.name] = currentField.value;
            }
        });
        let objectUser = new User(user.name, 
            user.gender, 
            user.birth, 
            user.country, 
            user.email, 
            user.password, 
            user.photo,
            user.admin);
        return objectUser;
    }
}