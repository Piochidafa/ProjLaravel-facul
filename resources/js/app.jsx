import './bootstrap';
import '../css/app.css';


import 'primereact/resources/primereact.min.css'; // Importe os estilos do PrimeReact depois
import 'primeicons/primeicons.css'; // Importe os estilos do PrimeReact depois
import 'react-toastify/dist/ReactToastify.css';

import 'primereact/resources/themes/soho-light/theme.css'


import { createRoot } from 'react-dom/client';
import {ToastContainer, toast} from 'react-toastify'
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"/>
            </>
        
        );
    },
    progress: {
        color: '#4B5563',
    },
});
