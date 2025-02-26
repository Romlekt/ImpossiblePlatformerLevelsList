/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

export function score(rank, time, TAS) {

    let maxpoints = 255*Math.pow(rank+4.53981, -0.545875)-0.15783;
    let timefactor;
    if (compare(time, TAS)){
        timefactor = 1;
    }
    else{
        timefactor = Math.pow(toMillis(TAS)/toMillis(time), 2);
    }

    let score_calc = maxpoints * timefactor;

    return Math.max(round(score_calc), 0);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}

export function compare(time1, time2){
    return (time1.length === time2.length && time1.every((element, index) => element === time2[index]));
}

export function toMillis(time){
    if (time.length != 4){
        return -1;
    }
    return 3600000 * (time[0]?time[0]:0) + 60000 * (time[1]?time[1]:0) + 1000 * (time[2]?time[2]:0) + (time[3]?time[3]:0);
}

export function toDisplay(time){
    if (time.length != 4){
        return "Invalid Time";
    }
    return String(time[0]).padStart(2, '0')+":"+String(time[1]).padStart(2, '0')+":"+String(time[2]).padStart(2, '0')+":"+String(time[3]).padStart(3, '0');
}