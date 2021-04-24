import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


exports.setObject = async (key,obj) => {
  await Storage.set({
    key: key,
    value: JSON.stringify(obj)
  });
}

exports.getObject = async(key) => {
  return await Storage.get({ key: key });
}

exports.setItem = async (key,value) => {
  await Storage.set({
    key: key,
    value: value
  });
}

exports.getItem = async(key) => {
  return await Storage.get({ key: key });
}

exports.removeItem = async(key) => {
  await Storage.remove({ key: key });
}

exports.keys = async() => {
  const { keys } = await Storage.keys();
    return keys;
}

exports.clear = async() => {
  await Storage.clear();
}