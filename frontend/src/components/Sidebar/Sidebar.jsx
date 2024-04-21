import "./Sidebar.css"
import {Link} from "react-router-dom";
export const Sidebar = () => {
  return (
      <div className="nav-sidebar">
          <div className='nav-logo'>
              <div className='nav-frame-logo'/>
              <span className='sprynya-camp'>Sprynya camp</span>
          </div>
          <div className='nav-item-base'>
              <div className='nav-background'/>
              <div className='nav-content'>
                  <div className='nav-button-users'>
                      <div className='nav-icon'/>
                  </div>
                  <Link to='/'className='nav-text'>Будинки</Link>
              </div>
          </div>
          <div className='nav-item-dropdown'>
              <div className='nav-item-base-dropdown'>
                  <div className='nav-frame-1'>
                      <div className='nav-content-2'>
                          <div className='nav-button-list'>
                              <div className='nav-icon-3'/>
                          </div>
                          <Link to='/childrens' className='nav-text-4'>Діти</Link>
                      </div>
                  </div>
              </div>
          </div>
          <div className='nav-item-base-5'>
              <div className='nav-content-6'>
                  <div className='nav-button-layers-two'>
                      <div className='nav-icon-7'/>
                  </div>
                  <Link to='/supervisors' className='nav-text-8'>Вихователі</Link>
              </div>
          </div>
          <div className='nav-item-base-9'>
              <div className='nav-content-a'>
                  <div className='nav-bar-line-chart'>
                      <div className='nav-icon-b'/>
                  </div>
                  <span className='nav-text-c'>Аналітика</span>
              </div>
          </div>
      </div>
  );
}