class UserController{
    constructor(formId, tbodyId){
        this.tbodyEl = document.getElementById(tbodyId);
        this.formEl = document.getElementById(formId);
        this.onSubmit();
    }

    onSubmit(){
        this.formEl.addEventListener('submit', event=>{
            event.preventDefault();
            const submitBtn = this.formEl.querySelector('[type=submit]');
            submitBtn.disabled = true;
            let myValues = this.values;
            myValues.photo = "";
            this.photo.then(content => {
                //The 'content' varible receives the fileReader.result content
                myValues.photo = content;
                //The use of this to refer to the object userController is posible here because the arrow function does not
                //change the working scope
                this.addLine(myValues, this.tbodyEl);  
                this.formEl.reset();
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
    get photo(){
        //getter photo is now an async function
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            //elements receives only the item with 'photo' name inside the, parsed to array, this.formEl.elements
            let elements = [...this.formEl.elements].filter(item => {
                if(item.name == 'photo') return item;
            });
            //As it's receiving from an array, elements is an array. Than, we add the [0] to it. 
            //In case there are more than one picture, use just the first one;
            let file = elements[0].files[0];
            fileReader.onload = () => {
                //Loads the entered picture and sends the loaded content as the promise's resolving 
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                //Logs any errors that might happen
                reject(error);
            }
            //Read the picture as a base 64 text
            if(file) fileReader.readAsDataURL(file);
            //If no image file was entered, just resolve with a default value
            else {
                if(this.values.gender){
                    if(this.values.gender.includes('F')){
                        resolve('dist/img/avatar2.png');
                    }
                    else{
                        resolve('dist/img/avatar04.png')
                    }
                }
                else resolve('dist/img/boxed-bg.jpg');
            }
        });
    }
    get values(){
        let user = {};
        /*
            Use of 'Spread' is necessary here: obj => Array
            Example: [] => Array's operator
            Example: [item0, item1, item1] = array
            Example: [...items] => An array with an undefined number of elements
        */
        [...this.formEl.elements].forEach(currentField => {
            if(currentField.name === 'gender'){
                if(currentField.checked){
                    user[currentField.name] = currentField.id;
                }
            }
            else if(currentField.name === 'admin'){
                // ternary if: If(currentField.checked)
                // ? then, return __
                // : else, return __
                currentField.checked ? user[currentField.name] = 'Sim' : user[currentField.name] = 'Não';
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