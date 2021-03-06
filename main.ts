//%color=#0B0B61 icon="\uf1eb" block="IoT"
namespace ESP8266 {
    // -------------- Initialization ----------------
    /**
     * Initialize the TX and RX pins for connecting the WiFi Module.
    */
    //%blockId=esp8266_initialize_wifi
    //%block="Initialize WiFi TX %tx|RX %rx|Baud rate %baudrate"
    //%baudrate.defl=BaudRate.BaudRate115200
    //% tx.fieldEditor="gridpicker" tx.fieldOptions.columns=3
    //% tx.fieldOptions.tooltips="false"
    //% rx.fieldEditor="gridpicker" rx.fieldOptions.columns=3
    //% rx.fieldOptions.tooltips="false"
    //% weight=82
    export function initializeWifi(tx: SerialPin, rx: SerialPin, baudrate: BaudRate): void {
        serial.redirect(tx, rx, baudrate);
    }

    // -------------- WiFi ----------------
    /**
     * Set the SSID and Password for the WiFi Module to connect.
    */
    //% blockId=esp8266_set_wifi
    //% block="Set WiFi to ssid %ssid| pwd %pwd"
    //% weight=81
    export function setWifi(ssid: string, pwd: string): void {
        serial.writeString("AT+RST\r\n");
        basic.pause(500);
        serial.writeString("AT+CWMODE=1\r\n");
        basic.pause(500);
        serial.writeString("AT+CWJAP=\"" + ssid + "\",\"" + pwd + "\"\r\n");
        basic.pause(500);
    }

    // -------------- Cloud Services ----------------
    /**
     * Send single data to ThingSpeak.
    */
    //% blockId=esp8266_set_thingspeak
    //% block="Send ThingSpeak key %key| field1 %field1"
    //% text.shadowOptions.toString=true
    //% weight=78
    export function sendThingspeak(key: string, field1: string): void {
        let message = "GET /update?api_key=" + key + "&field1=" + field1 + "\r\n\r\n";
        serial.writeString("AT+CIPMUX=0\r\n");
        basic.pause(500);
        serial.writeString("AT+CIPSTART=\"TCP\",\"api.thingspeak.com\",80\r\n");
        basic.pause(1000);
        serial.writeString("AT+CIPSEND=" + message.length + "\r\n");
        basic.pause(500);
        serial.writeString(message);
        basic.pause(1000);
        serial.writeString("AT+CIPCLOSE\r\n");
    }

    /**
     * Send an array of data (aka mutiple data) to ThingSpeak.
    */
    //% blockId=esp8266_set_thingspeak_list
    //% block="Send ThingSpeak key %key| array %fields"
    //% weight=77
    export function sendThingspeakwithArray(key: string, fields: string[]): void {
        let message2 = "GET /update?api_key=" + key + "&";
        for (let i = 0; i < fields.length; i++) {
            if (i == fields.length - 1) {
                message2 = message2 + "field" + (i + 1) + "=" + fields[i];
            } else {
                message2 = message2 + "field" + (i + 1) + "=" + fields[i] + "&";
            }
        }
        message2 = message2 + "\r\n\r\n";
        serial.writeString("AT+CIPMUX=0\r\n");
        basic.pause(500);
        serial.writeString("AT+CIPSTART=\"TCP\",\"api.thingspeak.com\",80\r\n");
        basic.pause(1000);
        serial.writeString("AT+CIPSEND=" + message2.length + "\r\n");
        basic.pause(500);
        serial.writeString(message2);
        basic.pause(3000);
        serial.writeString("AT+CIPCLOSE\r\n");
    }

    /**
     * Send single data to IFTTT Event Trigger.
    */
    //% blockId=esp8266_set_ifttt
    //% block="Send IFTTT key %key|event_name %eventname|value %value"
    //% text.shadowOptions.toString=true
    //% weight=80
    export function sendIFTTT(key: string, eventname: string, value: string): void {
        let message3 = "GET /trigger/" + eventname + "/with/key/" + key + "?value1=" + value + " HTTP/1.1\r\nHost: maker.ifttt.com\r\nConnection: close\r\n\r\n";
        serial.writeString("AT+CIPMUX=0\r\n");
        basic.pause(500)
        serial.writeString("AT+CIPSTART=\"TCP\",\"maker.ifttt.com\",80\r\n");
        basic.pause(1000);
        serial.writeString("AT+CIPSEND=" + message3.length + "\r\n");
        basic.pause(500)
        serial.writeString(message3);
        basic.pause(1000)
        serial.writeString("AT+CIPCLOSE\r\n");
    }

    /**
     * Send an array of data (aka mutiple data) to IFTTT Event Trigger.
    */
    //% blockId=esp8266_set_ifttt_list
    //% block="Send IFTTT key %key|event_name %eventname|array %values"
    //% weight=79
    export function sendIFTTTwithArray(key: string, eventname: string, values: string[]): void {
        let message4 = "GET /trigger/" + eventname + "/with/key/" + key + "?";
        for (let j = 0; j < values.length; j++) {
            if (j == values.length - 1) {
                message4 = message4 + "value" + (j + 1) + "=" + values[j];
            } else {
                message4 = message4 + "value" + (j + 1) + "=" + values[j] + "&";
            }
        }
        message4 = message4 + " HTTP/1.1\r\nHost: maker.ifttt.com\r\nConnection: close\r\n\r\n";
        serial.writeString("AT+CIPMUX=0\r\n");
        basic.pause(500);
        serial.writeString("AT+CIPSTART=\"TCP\",\"maker.ifttt.com\",80\r\n");
        basic.pause(1000);
        serial.writeString("AT+CIPSEND=" + message4.length + "\r\n");
        basic.pause(500);
        serial.writeString(message4);
        basic.pause(3000);
        serial.writeString("AT+CIPCLOSE\r\n");
    }

    /** Convert a number to a string. */
    //%blockId=make_string
    //%block="number to string %target"
    //%weight=0
    export function make_string(target: number): string {
        return target.toString()
    }

}
