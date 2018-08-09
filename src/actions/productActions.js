import {ADD_PRODUCT, ADD_CATEGORY, ADD_PRODUCT_TYPE, FETCH_CATEGORIES_SUCCESS, FETCH_PRODUCT_TYPES_SUCCESS, TOGGLE_CATEGORY_MODAL, TOGGLE_PRODUCT_TYPE_MODAL} from "../constants/constants";
import firebase from "firebase";

export const addProduct = ({
  vendorUid,
  productName,
  selectedCategory,
  selectedProductType,
  description,
  price,
  unit,
  productImagesURLObject
}) => {

  var newProductKey = firebase.database().ref().child("/products/").push().key;

  var updates = {};

  updates["/products/" + newProductKey] = {
    images: "",
    productName,
    category: selectedCategory,
    productType: selectedProductType,
    description: description,
    price,
    unit
  };

  updates["/productsByVendor/" + vendorUid + "/" + newProductKey] = {productName, productType: selectedProductType, price, unit};
  updates["/productsByProductType/" + selectedProductType + "/" + newProductKey] = {productName, price, unit, vendor: vendorUid};

  var imageUpdates = {}

  for (var image in productImagesURLObject) {
    var newImageKey = firebase.database().ref().child("/products/" + newProductKey + "/images").push().key;
    imageUpdates["/products/" + newProductKey + "/images/" + newImageKey] = productImagesURLObject[image]
    imageUpdates["/productsByVendor/" + vendorUid + "/" + newProductKey + "/images/" + newImageKey] = productImagesURLObject[image]
  }
  
  return dispatch => {
    firebase.database().ref().update(updates).then(() => {
      console.log('product added')
      firebase.database().ref().update(imageUpdates).then(() => {
        console.log('product images added')
      });
    });
  }
}

export const fetchCategories = () => {
  return dispatch => {
    firebase.database().ref("/categories/").on("value", snapshot => {
      dispatch({type: FETCH_CATEGORIES_SUCCESS, payload: snapshot.val()});
    });
  };
}

export const fetchProductTypes = (categoryUid) => {
  console.log(categoryUid)
  return dispatch => {
    firebase.database().ref("/productTypesbyCategory/" + categoryUid).on("value", snapshot => {
      dispatch({type: FETCH_PRODUCT_TYPES_SUCCESS, payload: snapshot.val()});
    });
  };
}

export const toggleProductTypeModal = toggle => {
  return dispatch => {
    dispatch({type: TOGGLE_PRODUCT_TYPE_MODAL, payload: toggle});
  };
}

export const toggleCategoryModal = toggle => {
  return dispatch => {
    dispatch({type: TOGGLE_CATEGORY_MODAL, payload: toggle});
  };
};

export const addCategory = ({category, subTitle, imageURL}) => {
  return dispatch => {
    firebase
      .database()
      .ref("/categories")
      .child(category)
      .set({subTitle, imageURL})
      .then(() => {
        dispatch({type: ADD_CATEGORY});
      });
  };
};

export const addProductType = ({category, productType, imageURL}) => {
  return dispatch => {
    firebase
      .database()
      .ref("/productType")
      .child(productType)
      .set({category, imageURL})
      .then(() => {
        console.log('productType added')
        firebase
          .database()
          .ref("/productTypesbyCategory/" + category)
          .child(productType)
          .set({imageURL})
          .then(() => {
            console.log('productTypesbyCategory added')
          })
      });
  };
};
