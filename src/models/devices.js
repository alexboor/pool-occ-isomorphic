/**
 * Created by alexboor on 8/9/2017.
 */

let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let DeviceSchema = new Schema({
    ipaddr: {type: String, required: true},
    title: {type: String, required: false},
    modified: { type: Date, default: Date.now }
});

let DeviceModel = mongoose.model('Device', DeviceSchema);


class Device {

    constructor() {

    }


    /**
     * get
     *
     * Return list of devices
     *
     * @returns {Promise}
     */
    get() {
        return new Promise((resolve,reject) => {
            DeviceModel.find().exec((err, device) => {
                if (err) reject(err);

                resolve(device)
            })
        })
    }

    /**
     * create
     *
     * Add new device
     *
     * @returns {Promise}
     */
    create(ip,title) {
        return new Promise((resolve,reject) => {
            DeviceModel.create({
                ipaddr: ip,
                title: title
            }, (err, device) => {
                if (err) reject(err);
                resolve(device);
            })
        })
    }

    /**
     * update
     *
     * Update device info
     *
     * @returns {Promise}
     */
    update() {
        return new Promise((resolve,reject) => {

        })
    }

    /**
     * delete
     *
     * Delete the device
     *
     * @returns {Promise}
     */
    delete(id) {
        return new Promise((resolve,reject) => {
            DeviceModel.remove({_id: id}, (err, device) => {
                if (err) reject(err);
                resolve(device);
            })
        })
    }

}


export default new Device();