import "./Sidebar.css"
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
                  <span className='nav-text'>Будинки</span>
              </div>
          </div>
          <div className='nav-item-dropdown'>
              <div className='nav-item-base-dropdown'>
                  <div className='nav-frame-1'>
                      <div className='nav-content-2'>
                          <div className='nav-button-list'>
                              <div className='nav-icon-3'/>
                          </div>
                          <span className='nav-text-4'>Діти</span>
                      </div>
                  </div>
              </div>
          </div>
          <div className='nav-item-base-5'>
              <div className='nav-content-6'>
                  <div className='nav-button-layers-two'>
                      <div className='nav-icon-7'/>
                  </div>
                  <span className='nav-text-8'>Вихователі</span>
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