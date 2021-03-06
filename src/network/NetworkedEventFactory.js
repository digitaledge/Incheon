"use strict";

const Serializer = require('./../serialize/Serializer');
const Serializable = require('./../serialize/Serializable');
const Utils = require('./../Utils');

class NetworkedEventFactory {

    constructor(serializer, eventName, options){
        options = Object.assign({}, options);

        this.seriazlier = serializer;
        this.options = options;

        this.eventName = eventName;
        this.netScheme = options.netScheme;

    }

    /**
     * Creates a new networkedEvent
     * @param payload an object representing the payload to be transferred over the wire
     * @returns {Serializable} the new networkedEvent object
     */
    create(payload){
        let networkedEvent = new Serializable();
        networkedEvent.classId = Utils.hashStr(this.eventName);

        if (this.netScheme) {
            networkedEvent.netScheme = Object.assign({}, this.netScheme);

            //copy properties from the networkedEvent instance to its ad-hoc netsScheme
            for(let property of Object.keys(this.netScheme)){
                networkedEvent[property] = payload[property];
            }

        }
        else{
            //todo take care of the event where no netScheme is defined

        }


        return networkedEvent;
    };


}

module.exports = NetworkedEventFactory;
