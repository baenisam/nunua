import Link from "next/link";

export default function ALink ( { children, className,target,onClick, style, ...props } ) {
    function defaultFunction ( e ) {
        if ( props.href === '#') {
            e.preventDefault();
            onClick()
        } else if(props.href === '#' && props.onClick) {
            e.preventDefault();
        }
    }

    return (
        <Link onClick={onClick} target={target} { ...props }>
            <a className={ className } target={target} style={ style } onClick={ defaultFunction }>
                { children }
            </a>
        </Link>
    )
}