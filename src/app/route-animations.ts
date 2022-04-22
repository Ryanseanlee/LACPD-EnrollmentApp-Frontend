import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate, 
    keyframes, 
} from '@angular/animations';


export const fadeing = 
trigger('routeAnimations', [
    transition('*<=>*', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                opacity:0,
                left:0,
                width: '100%',
                transform: 'scale(0)',
            }),
        ]),
        query(':enter', [
            animate('600ms ease',
            style({opacity: 1, transform:'scale(1)'})
            ),
        ])
    ]),
]);