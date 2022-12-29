import moment from 'moment'
import _ from 'lodash'
import * as Notifications from 'expo-notifications'

moment.locale('vi')

moment.updateLocale('vi', {
    weekdays: ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'],
    months: [
        'THÁNG 1',
        'THÁNG 2',
        'THÁNG 3',
        'THÁNG 4',
        'THÁNG 5',
        'THÁNG 6',
        'THÁNG 7',
        'THÁNG 8',
        'THÁNG 9',
        'THÁNG 10',
        'THÁNG 11',
        'THÁNG 12',
    ],
})

// 'dddd, Do MMMM'
// 'hh:mm'
const ConvertUnixTimeToUTC = (time, format) => {
    return time ? moment(time * 1000).format(format) : ''
}

const ConvertDateToDays = (time) => {
    return moment(time).format('dddd')
}

const ConvertKToC = (kelvin) => {
    return kelvin ? (kelvin - 273.15).toFixed() : ''
}

const ConvertVisibility = (visibility) => {
    return visibility ? (visibility / 1000).toFixed() : ''
}

const ConvertWindSpeed = (speed) => {
    return speed ? (speed * 3.6).toFixed() : ''
}

const ConvertWindDeg = (deg) => {
    let res = ''

    if (deg >= 22.5 && deg <= 112.5) {
        res = 'đông - đông bắc'
    } else if (deg > 112.5 && deg < 202.5) {
        res = 'nam - đông nam'
    } else if (deg > 202.5 && deg < 292.5) {
        res = 'tây - tây nam'
    } else {
        res = 'bắc - tây bắc'
    }

    return res
}

const ConvertPop = (value) => {
    return value ? (value * 100).toFixed() : '0'
}

const ConvertAqi = (num) => {
    switch (true) {
        case num <= 50:
            return 'good'
        case 50 < num && num <= 100:
            return 'fair'
        case 100 < num && num <= 150:
            return 'moderate'
        case 150 < num && num <= 200:
            return 'poor'
        case 200 < num && num <= 300:
            return 'veryPoor'
        case 300 < num && num <= 500:
            return 'dangerous'
        default:
            console.log('Invalid Range')
    }
}

export async function sendPushNotification(expoPushToken, messageData) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: messageData.title,
        body: messageData.body,
        data: { someData: 'goes here' },
    }

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    })
}

export async function schedulePushNotification(message, hours = 8, minutes = 0) {
    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: message.title,
            body: message.body,
            sound: 'default',
        },
        trigger: {
            hour: hours,
            minute: minutes,
            repeats: true,
        },
    })
    console.log('notif id on scheduling', id)
    return id
}

export async function cancelNotification(notifId) {
    await Notifications.cancelScheduledNotificationAsync(notifId)
}

export {
    ConvertKToC,
    ConvertUnixTimeToUTC,
    ConvertDateToDays,
    ConvertVisibility,
    ConvertWindSpeed,
    ConvertWindDeg,
    ConvertPop,
    ConvertAqi,
}
