import React, { useEffect } from 'react';

import ALink from '~/components/features/alink';
import { countTo } from '~/utils';
import useAsync from '~/Hooks/useAsync';
import SettingServices from '~/services/SettingServices';
import MetaDocument from '~/components/Meta';
import renderHTML from 'react-render-html';
function PrivacyPolicy () {
    const { data, loading } = useAsync(SettingServices.globalSettings);
    useEffect( () => {
        countTo();
    }, [] );

    return (
        <div className="main">
            {/* <PageHeader title="About us 2" subTitle="Pages" /> */}
            <MetaDocument title="Politique de confidentialité"/>
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Accueil</ALink>
                        </li>
                        <li className="breadcrumb-item active">Politique de confidentialité</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content pb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="about-text mt-3">
                                <h2 className="title mb-2">Politique de confidentialité</h2>
                                <div className='content-condition'>
                                {renderHTML(`${data?.politique}`)}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default React.memo( PrivacyPolicy );