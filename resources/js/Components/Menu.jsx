import React from 'react';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { Avatar } from 'primereact/avatar';

export default function Menu() {
    const toast = useRef < Toast > (null);
    let items = [
        { label: 'Profile', icon: 'pi pi-fw pi-user' },
        { label: 'Settings', icon: 'pi pi-fw pi-cog' },
        { separator: true },
        {
            command: () => { toast.current.show({ severity: 'info', summary: 'Info', detail: 'Item Selected', life: 3000 }); },
            template: (item, options) => {
                return (
                    <button onClick={(e) => options.onClick(e)} className={classNames(options.className, 'w-full p-link flex align-items-center')}>
                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" className="mr-2" shape="circle" />
                        <div className="flex flex-column align">
                            <span className="font-bold">Amy Elsner</span>
                            <span className="text-sm">Agent</span>
                        </div>
                    </button>
                )
            }
        }
    ];

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} />
            <Menu model={items} />
        </div>
    )
}