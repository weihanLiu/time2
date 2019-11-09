import store from './store';



export function post(path, body) {
    let state = store.getState();
    let token = state.session == null ? null : state.session.token;
    return fetch('/ajax' + path, {
     method: 'post',
     credentials: 'same-origin',
     headers: new Headers({
       'x-csrf-token': window.csrf_token,
       'content-type': "application/json; charset=UTF-8",
       'accept': 'application/json',
       'x-auth': token || "",
     }),
     body: JSON.stringify(body),
   }).then((resp) => resp.json());
 }
 
 export function get(path) {
    let state = store.getState();
    let token = state.session.token;
    return fetch('/ajax' + path, {
      method: 'get',
      credentials: 'same-origin',
      headers: new Headers({
        'x-csrf-token': window.csrf_token,
        'content-type': "application/json; charset=UTF-8",
        'accept': 'application/json',
        'x-auth': token || "",
      }),
    }).then((resp) => resp.json());
}

export function get_sheet(id) {
  get('/sheets/'+id)
    .then((resp) => {
      console.log("get_sheet", resp)
      store.dispatch({
        type: 'ADD_SHEETS',
        data: [resp.data],
      });
    });
}


export function list_sheets() {
    get('/sheets')
        .then((resp) => {
        console.log("list_sheets", resp);
        store.dispatch({
            type: 'ADD_SHEETS',
            data: resp.data,
        });
    });
}


export function submit_new_sheet(form) {
    let state = store.getState();
    let data = state.forms.new_sheet;
    
    let session = store.getState().session;
    console.log(store.getState());
    console.log("in submit_new_sheet")
    console.log(data)

    if (data.date == null) {
      return;
    }
    post("/sheets", {sheet: {
        date: data.date,
        tasks: data.tasks
        }})
        .then((resp) => {
          console.log(resp);
          if (resp.data) {
            store.dispatch({
              type: 'ADD_SHEETS',
              data: [resp.data],
            });
            form.redirect('/sheets/' + resp.data.id);
          }
          else {
            store.dispatch({
              type: 'CHANGE_NEW_SHEET',
              data: {errors: JSON.stringify(resp.errors)},
            });
          }
        });
}

export function approve_sheet(id) {
    let state = store.getState();
    post('/sheets/approve', {id: id})
      .then((resp) => {
        console.log("approve_sheets", resp);
        store.dispatch({
          type: 'ADD_SHEETS',
          data: [resp.data],
        });
      });
}

export function submit_login(form) {
  console.log("in submit logtin")
    console.log(form)
    let state = store.getState();
    let data = state.forms.login;
  
    post('/sessions', data)
      .then((resp) => {
        console.log(resp);
        if (resp.token) {
          localStorage.setItem('session', JSON.stringify(resp));
          store.dispatch({
            type: 'LOG_IN',
            data: resp,
          });
          form.redirect('/');
        }
        else {
          store.dispatch({
            type: 'CHANGE_LOGIN',
            data: {errors: JSON.stringify(resp.errors)},
          });
        }
      });
}