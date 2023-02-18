import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <>
      <div className="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12">
        <div className="h-full flex items-center">
          {/* <!-- BEGIN: Logo */}
          <a href="" className="-intro-x hidden md:flex">
            {/* <img
              alt="Midone - HTML Admin Template"
              className="w-6"
              src="http://icewall.left4code.com/dist/images/logo.svg"
            /> */}
            <span className="text-white text-lg ml-3 uppercase font-bold">
              Fragile
            </span>
          </a>
          {/* <!-- END: Logo */}
          {/* <!-- BEGIN: Breadcrumb */}
          <nav aria-label="breadcrumb" className="-intro-x h-full mr-auto">
            <ol className="breadcrumb breadcrumb-light">
              <li className="breadcrumb-item">
                <Link to="/">Hệ thống</Link>
              </li>
              {/* <li className="breadcrumb-item active" aria-current="page">
                Bảng điều khiển
              </li> */}
            </ol>
          </nav>
          {/* <!-- END: Breadcrumb */}
          {/* <!-- BEGIN: Search */}
          <div className="intro-x relative mr-3 sm:mr-6">
            <div className="search hidden sm:block">
              <input
                type="text"
                className="search__input form-control border-transparent"
                placeholder="Search..."
              />
              <i
                data-lucide="search"
                className="search__icon dark:text-slate-500"
              ></i>
            </div>
            <a className="notification notification--light sm:hidden" href="">
              <i
                data-lucide="search"
                className="notification__icon dark:text-slate-500"
              ></i>
            </a>
            <div className="search-result">
              <div className="search-result__content">
                <div className="search-result__content__title">Pages</div>
                <div className="mb-5">
                  <a href="" className="flex items-center">
                    <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
                      <i className="w-4 h-4" data-lucide="inbox"></i>
                    </div>
                    <div className="ml-3">Mail Settings</div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full">
                      <i className="w-4 h-4" data-lucide="users"></i>
                    </div>
                    <div className="ml-3">Users & Permissions</div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
                      <i className="w-4 h-4" data-lucide="credit-card"></i>
                    </div>
                    <div className="ml-3">Transactions Report</div>
                  </a>
                </div>
                <div className="search-result__content__title">Users</div>
                <div className="mb-5">
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Midone - HTML Admin Template"
                        className="rounded-full"
                        src="http://icewall.left4code.com/dist/images/profile-2.jpg"
                      />
                    </div>
                    <div className="ml-3">Johnny Depp</div>
                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                      johnnydepp@left4code.com
                    </div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Midone - HTML Admin Template"
                        className="rounded-full"
                        src="http://icewall.left4code.com/dist/images/profile-1.jpg"
                      />
                    </div>
                    <div className="ml-3">Al Pacino</div>
                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                      alpacino@left4code.com
                    </div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Midone - HTML Admin Template"
                        className="rounded-full"
                        src="http://icewall.left4code.com/dist/images/profile-13.jpg"
                      />
                    </div>
                    <div className="ml-3">Russell Crowe</div>
                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                      russellcrowe@left4code.com
                    </div>
                  </a>
                  <a href="" className="flex items-center mt-2">
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Midone - HTML Admin Template"
                        className="rounded-full"
                        src="http://icewall.left4code.com/dist/images/profile-2.jpg"
                      />
                    </div>
                    <div className="ml-3">Robert De Niro</div>
                    <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                      robertdeniro@left4code.com
                    </div>
                  </a>
                </div>
                <div className="search-result__content__title">Products</div>
                <a href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 image-fit">
                    <img
                      alt="Midone - HTML Admin Template"
                      className="rounded-full"
                      src="http://icewall.left4code.com/dist/images/preview-4.jpg"
                    />
                  </div>
                  <div className="ml-3">Samsung Galaxy S20 Ultra</div>
                  <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                    Smartphone &amp; Tablet
                  </div>
                </a>
                <a href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 image-fit">
                    <img
                      alt="Midone - HTML Admin Template"
                      className="rounded-full"
                      src="http://icewall.left4code.com/dist/images/preview-4.jpg"
                    />
                  </div>
                  <div className="ml-3">Sony Master Series A9G</div>
                  <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                    Electronic
                  </div>
                </a>
                <a href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 image-fit">
                    <img
                      alt="Midone - HTML Admin Template"
                      className="rounded-full"
                      src="http://icewall.left4code.com/dist/images/preview-5.jpg"
                    />
                  </div>
                  <div className="ml-3">Sony A7 III</div>
                  <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                    Photography
                  </div>
                </a>
                <a href="" className="flex items-center mt-2">
                  <div className="w-8 h-8 image-fit">
                    <img
                      alt="Midone - HTML Admin Template"
                      className="rounded-full"
                      src="http://icewall.left4code.com/dist/images/preview-1.jpg"
                    />
                  </div>
                  <div className="ml-3">Sony Master Series A9G</div>
                  <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                    Electronic
                  </div>
                </a>
              </div>
            </div>
          </div>
          {/* <!-- END: Search */}
          {/* <!-- BEGIN: Notifications */}
          <div className="intro-x dropdown mr-4 sm:mr-6">
            <div
              className="dropdown-toggle notification notification--bullet cursor-pointer"
              role="button"
              aria-expanded="false"
              data-tw-toggle="dropdown"
            >
              <i
                data-lucide="bell"
                className="notification__icon dark:text-slate-500"
              ></i>
            </div>
            <div className="notification-content pt-2 dropdown-menu">
              <div className="notification-content__box dropdown-content">
                <div className="notification-content__title">Notifications</div>
                <div className="cursor-pointer relative flex items-center">
                  <div className="w-12 h-12 flex-none image-fit mr-1">
                    <img
                      alt="Midone - HTML Admin Template"
                      className="rounded-full"
                      src="http://icewall.left4code.com/dist/images/profile-2.jpg"
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a href={undefined} className="font-medium truncate mr-5">
                        Johnny Depp
                      </a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                        01:10 PM
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry&#039;s standard dummy text ever since the 1500
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer relative flex items-center mt-5">
                  <div className="w-12 h-12 flex-none image-fit mr-1">
                    <img
                      alt="Midone - HTML Admin Template"
                      className="rounded-full"
                      src="http://icewall.left4code.com/dist/images/profile-1.jpg"
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a href={undefined} className="font-medium truncate mr-5">
                        Al Pacino
                      </a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                        01:10 PM
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry&#039;s standard dummy text ever since the 1500
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer relative flex items-center mt-5">
                  <div className="w-12 h-12 flex-none image-fit mr-1">
                    <img
                      alt="Midone - HTML Admin Template"
                      className="rounded-full"
                      src="http://icewall.left4code.com/dist/images/profile-13.jpg"
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a href={undefined} className="font-medium truncate mr-5">
                        Russell Crowe
                      </a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                        01:10 PM
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomi
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer relative flex items-center mt-5">
                  <div className="w-12 h-12 flex-none image-fit mr-1">
                    <img
                      alt="Midone - HTML Admin Template"
                      className="rounded-full"
                      src="http://icewall.left4code.com/dist/images/profile-2.jpg"
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a href={undefined} className="font-medium truncate mr-5">
                        Robert De Niro
                      </a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                        01:10 PM
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomi
                    </div>
                  </div>
                </div>
                <div className="cursor-pointer relative flex items-center mt-5">
                  <div className="w-12 h-12 flex-none image-fit mr-1">
                    <img
                      alt="Midone - HTML Admin Template"
                      className="rounded-full"
                      src="http://icewall.left4code.com/dist/images/profile-3.jpg"
                    />
                    <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-2 overflow-hidden">
                    <div className="flex items-center">
                      <a href={undefined} className="font-medium truncate mr-5">
                        Arnold Schwarzenegger
                      </a>
                      <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                        01:10 PM
                      </div>
                    </div>
                    <div className="w-full truncate text-slate-500 mt-0.5">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry&#039;s standard dummy text ever since the 1500
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- END: Notifications */}
          {/* <!-- BEGIN: Account Menu */}
          <div className="intro-x dropdown w-8 h-8">
            <div
              className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
              role="button"
              aria-expanded="false"
              data-tw-toggle="dropdown"
            >
              <img
                alt="Midone - HTML Admin Template"
                src="http://icewall.left4code.com/dist/images/profile-6.jpg"
              />
            </div>
            <div className="dropdown-menu w-56">
              <ul className="dropdown-content bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                <li className="p-2">
                  <div className="font-medium">Johnny Depp</div>
                  <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                    Backend Engineer
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider border-white/[0.08]" />
                </li>
                <li>
                  <a href="" className="dropdown-item hover:bg-white/5">
                    <i data-lucide="user" className="w-4 h-4 mr-2"></i> Profile
                  </a>
                </li>
                <li>
                  <a href="" className="dropdown-item hover:bg-white/5">
                    <i data-lucide="edit" className="w-4 h-4 mr-2"></i> Add
                    Account
                  </a>
                </li>
                <li>
                  <a href="" className="dropdown-item hover:bg-white/5">
                    <i data-lucide="lock" className="w-4 h-4 mr-2"></i> Reset
                    Password
                  </a>
                </li>
                <li>
                  <a href="" className="dropdown-item hover:bg-white/5">
                    <i data-lucide="help-circle" className="w-4 h-4 mr-2"></i>{" "}
                    Help
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider border-white/[0.08]" />
                </li>
                <li>
                  <a href="" className="dropdown-item hover:bg-white/5">
                    <i data-lucide="toggle-right" className="w-4 h-4 mr-2"></i>{" "}
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- END: Account Menu */}
        </div>
      </div>
    </>
  );
};

export default TopBar;
