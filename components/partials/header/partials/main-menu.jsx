import { useRouter } from 'next/router';

import ALink from '~/components/features/alink';

function MainMenu() {
    const router = useRouter();
    let path = router.asPath;
    let query = router.query;

    function showAllDemos( e ) {
        let demoItems = document.querySelectorAll( '.demo-item.hidden' );

        for ( let i = 0; i < demoItems.length; i++ ) {
            demoItems[ i ].classList.toggle( 'show' );
        }

        document.querySelector( '.view-all-demos' ).classList.toggle( 'disabled-hidden' );
        e.preventDefault();
    }

    return (
        <nav className="main-nav">
            <ul className="menu sf-arrows">
                <li className={ `megamenu-container ${ path === '/' ? 'active' : '' }` } id="menu-home">
                    <ALink href="/">Accueil</ALink>
                </li>
                <li className={ `megamenu-container ${ path === '/about-us' ? 'active' : '' }` } id="">
                    <ALink href="/about-us">A propos de nous</ALink>
                </li>
                <li className={ `megamenu-container ${ path === '/contact-us' ? 'active' : '' }` } id="">
                    <ALink href="/contact-us">Contactez-nous</ALink>
                </li>
                {/* <li className={ path.indexOf( "product/" ) > -1 ? 'active' : '' }>
                    <ALink href="/product/default/dark-yellow-lace-cut-out-swing-dress" className="sf-with-ul">Product</ALink>

                    <div className="megamenu megamenu-sm">
                        <div className="row no-gutters">
                            <div className="col-md-6">
                                <div className="menu-col">
                                    <div className="menu-title">Product Details</div>
                                    <ul>
                                        <li className={ path.indexOf( "product/default" ) > -1 ? 'active' : '' }><ALink href="/product/default/dark-yellow-lace-cut-out-swing-dress">Default</ALink></li>
                                        <li className={ path.indexOf( "product/centered" ) > -1 ? 'active' : '' }><ALink href="/product/centered/beige-ring-handle-circle-cross-body-bag">Centered</ALink></li>
                                        <li className={ path.indexOf( "product/extended" ) > -1 ? 'active' : '' }><ALink href="/product/extended/yellow-tie-strap-block-heel-sandals"><span>Extended Info<span className="tip tip-new">New</span></span></ALink></li>
                                        <li className={ path.indexOf( "product/gallery" ) > -1 ? 'active' : '' }><ALink href="/product/gallery/beige-metal-hoop-tote-bag">Gallery</ALink></li>
                                        <li className={ path.indexOf( "product/sticky" ) > -1 ? 'active' : '' }><ALink href="/product/sticky/brown-faux-fur-longline-coat">Sticky Info</ALink></li>
                                        <li className={ path.indexOf( "product/sidebar" ) > -1 ? 'active' : '' }><ALink href="/product/sidebar/beige-v-neck-button-cardigan">Boxed With Sidebar</ALink></li>
                                        <li className={ path.indexOf( "product/fullwidth" ) > -1 ? 'active' : '' }><ALink href="/product/fullwidth/black-faux-leather-chain-trim-sandals">Full Width</ALink></li>
                                        <li className={ path.indexOf( "product/masonry" ) > -1 ? 'active' : '' }><ALink href="/product/masonry/black-denim-dungaree-dress">Masonry Sticky Info</ALink></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="banner banner-overlay">
                                    <ALink href="/product/centered/dark-yellow-lace-cut-out-swing-dress">
                                        <img src="images/menu/banner-2.jpg" alt="Banner" />

                                        <div className="banner-content banner-content-bottom">
                                            <div className="banner-title text-white">New Trends<br /><span><strong>spring { ( new Date() ).getFullYear() }</strong></span></div>
                                        </div>
                                    </ALink>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li className={ path.indexOf( "pages" ) > -1 ? 'active' : '' }>
                    <ALink href="#" className="sf-with-ul">Pages</ALink>

                    <ul>
                        <li className={ path.indexOf( "pages/about" ) > -1 ? 'active' : '' }>
                            <ALink href="/pages/about" className="sf-with-ul">About</ALink>

                            <ul>
                                <li className={ path.indexOf( "pages/about" ) > -1 && path.indexOf( "pages/about-2" ) === -1 ? 'active' : '' }><ALink href="/pages/about">About 01</ALink></li>
                                <li className={ path.indexOf( "pages/about-2" ) > -1 ? 'active' : '' }><ALink href="/pages/about-2">About 02</ALink></li>
                            </ul>
                        </li>
                        <li className={ path.indexOf( "pages/contact" ) > -1 ? 'active' : '' }>
                            <ALink href="/pages/contact" className="sf-with-ul">Contact</ALink>

                            <ul>
                                <li className={ path.indexOf( "pages/contact" ) > -1 && path.indexOf( "pages/contact-2" ) === -1 ? 'active' : '' }><ALink href="/pages/contact">Contact 01</ALink></li>
                                <li className={ path.indexOf( "pages/contact-2" ) > -1 ? 'active' : '' }><ALink href="/pages/contact-2">Contact 02</ALink></li>
                            </ul>
                        </li>
                        <li className={ path.indexOf( "pages/login" ) > -1 ? 'active' : '' }><ALink href="/pages/login">Login</ALink></li>
                        <li className={ path.indexOf( "pages/faq" ) > -1 ? 'active' : '' }><ALink href="/pages/faq">FAQs</ALink></li>
                        <li className={ path.indexOf( "404" ) > -1 ? 'active' : '' }><ALink href="/404">Error 404</ALink></li>
                        <li className={ path.indexOf( "pages/coming-soon" ) > -1 ? 'active' : '' }><ALink href="/pages/coming-soon">Coming Soon</ALink></li>
                    </ul>
                </li>
                <li className={ path.indexOf( "blog/" ) > -1 ? 'active' : '' }>
                    <ALink href="/blog/classic" className="sf-with-ul">Blog</ALink>

                    <ul>
                        <li className={ path.indexOf( "blog/classic" ) > -1 ? 'active' : '' }><ALink href="/blog/classic">Classic</ALink></li>
                        <li className={ path.indexOf( "blog/listing" ) > -1 ? 'active' : '' }><ALink href="/blog/listing" >Listing</ALink></li>
                        <li className={ path.indexOf( "blog/grid" ) > -1 ? 'active' : '' }>
                            <ALink href="/blog/grid/2cols" className="sf-with-ul">Grid</ALink>
                            <ul>
                                <li className={ path.indexOf( "blog/grid/2cols" ) > -1 ? 'active' : '' }><ALink href="/blog/grid/2cols">Grid 2 columns</ALink></li>
                                <li className={ path.indexOf( "blog/grid/3cols" ) > -1 ? 'active' : '' }><ALink href="/blog/grid/3cols">Grid 3 columns</ALink></li>
                                <li className={ path.indexOf( "blog/grid/4cols" ) > -1 ? 'active' : '' }><ALink href="/blog/grid/4cols">Grid 4 columns</ALink></li>
                                <li className={ path.indexOf( "blog/grid/sidebar" ) > -1 ? 'active' : '' }><ALink href="/blog/grid/sidebar">Grid sidebar</ALink></li>
                            </ul>
                        </li>
                        <li className={ path.indexOf( "blog/masonry" ) > -1 ? 'active' : '' }>
                            <ALink href="/blog/masonry/2cols" className="sf-with-ul">Masonry</ALink>
                            <ul>
                                <li className={ path.indexOf( "blog/masonry/2cols" ) > -1 ? 'active' : '' }><ALink href="/blog/masonry/2cols">Masonry 2 columns</ALink></li>
                                <li className={ path.indexOf( "blog/masonry/3cols" ) > -1 ? 'active' : '' }><ALink href="/blog/masonry/3cols">Masonry 3 columns</ALink></li>
                                <li className={ path.indexOf( "blog/masonry/4cols" ) > -1 ? 'active' : '' }><ALink href="/blog/masonry/4cols">Masonry 4 columns</ALink></li>
                                <li className={ path.indexOf( "blog/masonry/sidebar" ) > -1 ? 'active' : '' }><ALink href="/blog/masonry/sidebar">Masonry sidebar</ALink></li>
                            </ul>
                        </li>
                        <li className={ path.indexOf( "blog/mask" ) > -1 ? 'active' : '' }>
                            <ALink href="/blog/mask/grid" className="sf-with-ul">Mask</ALink>
                            <ul>
                                <li className={ path.indexOf( "blog/mask/grid" ) > -1 ? 'active' : '' }><ALink href="/blog/mask/grid">Blog Mask Grid</ALink></li>
                                <li className={ path.indexOf( "blog/mask/masonry" ) > -1 ? 'active' : '' }><ALink href="/blog/mask/masonry">Blog Mask Masonry</ALink></li>
                            </ul>
                        </li>
                        <li className={ path.indexOf( "blog/single" ) > -1 ? 'active' : '' }>
                            <ALink href="/blog/single/default/cras-ornare-tristique-elit." className="sf-with-ul">Single Post</ALink>
                            <ul>
                                <li className={ path.indexOf( "blog/single/default" ) > -1 ? 'active' : '' }><ALink href="/blog/single/default/cras-ornare-tristique-elit.">Default with sidebar</ALink></li>
                                <li className={ path.indexOf( "blog/single/fullwidth" ) > -1 ? 'active' : '' }><ALink href="/blog/single/fullwidth/fusce-pellentesque-suscipit.">Fullwidth no sidebar</ALink></li>
                                <li className={ path.indexOf( "blog/single/sidebar" ) > -1 ? 'active' : '' }><ALink href="/blog/single/sidebar/utaliquam-sollicitzdvudin-leo">Fullwidth with sidebar</ALink></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className={ path.indexOf( "element" ) > -1 ? 'active' : '' }>
                    <ALink href="/elements" className="sf-with-ul">Elements</ALink>

                    <ul>
                        <li className={ path.indexOf( "elements/products" ) > -1 ? "active" : '' }><ALink href="/elements/products">Products</ALink></li>
                        <li className={ path.indexOf( "elements/typography" ) > -1 ? "active" : '' }><ALink href="/elements/typography">Typography</ALink></li>
                        <li className={ path.indexOf( "elements/titles" ) > -1 ? "active" : '' }><ALink href="/elements/titles">Titles</ALink></li>
                        <li className={ path.indexOf( "elements/banners" ) > -1 ? "active" : '' }><ALink href="/elements/banners">Banners</ALink></li>
                        <li className={ path.indexOf( "elements/categories" ) > -1 ? "active" : '' }><ALink href="/elements/categories">Product Category</ALink></li>
                        <li className={ path.indexOf( "elements/video-banners" ) > -1 ? "active" : '' }><ALink href="/elements/video-banners">Video Banners</ALink></li>
                        <li className={ path.indexOf( "elements/buttons" ) > -1 ? "active" : '' }><ALink href="/elements/buttons">Buttons</ALink></li>
                        <li className={ path.indexOf( "elements/accordions" ) > -1 ? "active" : '' }><ALink href="/elements/accordions">Accordions</ALink></li>
                        <li className={ path.indexOf( "elements/tabs" ) > -1 ? "active" : '' }><ALink href="/elements/tabs">Tabs</ALink></li>
                        <li className={ path.indexOf( "elements/testimonials" ) > -1 ? "active" : '' }><ALink href="/elements/testimonials">Testimonials</ALink></li>
                        <li className={ path.indexOf( "elements/blog-posts" ) > -1 ? "active" : '' }><ALink href="/elements/blog-posts">Blog Posts</ALink></li>
                        <li className={ path.indexOf( "elements/cta" ) > -1 ? "active" : '' }><ALink href="/elements/cta">Call to Action</ALink></li>
                        <li className={ path.indexOf( "elements/icon-boxes" ) > -1 ? "active" : '' }><ALink href="/elements/icon-boxes">Icon Boxes</ALink></li>
                    </ul>
                </li> */}
            </ul>
        </nav>
    );
}

export default MainMenu;