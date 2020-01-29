import { basePath, apiVersion } from "./config";

export function getMenuApi() {
  const url = `${basePath}/${apiVersion}/get-menus`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}

export function updateMenuApi(token, menuId, data) {
  const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      return err;
    });
}

export function activateMenuApi(token, menuId, status) {
  const url = `${basePath}/${apiVersion}/activate-menu/${menuId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ active: status })
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      console.log(err);
    });
}

export function addMenuApi(token, menu) {
  const url = `${basePath}/${apiVersion}/add-menu`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(menu)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      console.log(err);
    });
}

export function deleteMenuApi(token, menuId) {
  const url = `${basePath}/${apiVersion}/delete-menu/${menuId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      console.log(err);
    });
}
