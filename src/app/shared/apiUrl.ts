import { signal } from "@angular/core";

export let api = "http://localhost:8000/api";

export let firebaseConfig = {
  apiKey: "AIzaSyDyuqh5xDIlGRp6jg_p_hrBtx2sWaBB5zs",
  authDomain: "rapid-stock.firebaseapp.com",
  projectId: "rapid-stock",
  storageBucket: "rapid-stock.appspot.com",
  messagingSenderId: "532104748507",
  appId: "1:532104748507:web:d22a4330387d7d69025bfe"
};


export let  test = signal<number>(0);

