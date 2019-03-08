// import AjaxModule from '../../modules/ajax.js';
// import {createMenu} from '../menu/menu.js';
// export function renderProfilePage(me) {
//     let container = document.createElement('div');
//     container.classList.add("profile_container");
//     let containerTop = document.createElement('div');
//     containerTop.classList.add("profile_container_top");

//     let profileTitle = document.createElement('div');
//     profileTitle.classList.add("profile_title");
//     profileTitle.textContent = "Профиль";
//     let profilePhoto = document.createElement('div');
//     profilePhoto.classList.add("profile_photo");
//     profilePhoto.textContent = "ИИ";

//     containerTop.appendChild(profileTitle);
//     containerTop.appendChild(profilePhoto);

//     let profileContainerGridblock = document.createElement('div');
//     profileContainerGridblock.classList.add("profile_container_gridblock");

//     containerTop.appendChild(profileContainerGridblock);
//     container.appendChild(containerTop);

//     let profileDataFooter = document.createElement('div');
//     profileDataFooter.classList.add("profile_data_footer");

//     let profileChangeButton = document.createElement('a');
//     profileChangeButton.classList.add("profile_change_button");
//     profileChangeButton.href = "#";
//     let profileChangeButtonPic = document.createElement('div');
//     profileChangeButtonPic.classList.add("profile_change_button_pic");
//     let svg1 = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.627 13.203l4.237-4.237 2.17 2.17-3.152 3.152-1.085 1.085c-.001.001-.243.225-.712.314l-1.621.306a.438.438 0 0 1-.36-.097.438.438 0 0 1-.097-.36l.306-1.621c.089-.468.312-.71.314-.712zM5.557 14H2.013a1 1 0 0 1-1-1v-.3c0-2.48 2.01-4.494 4.488-4.5v-.796a3 3 0 0 1-1.488-2.591V3a3.001 3.001 0 0 1 6 0v1.813a3 3 0 0 1-1.488 2.591V8.2a4.52 4.52 0 0 1 1.199.165 2477.73 2477.73 0 0 0-3.326 3.329c-.004.004-.509.552-.71 1.611L5.557 14zm8.994-6.812a.643.643 0 0 0-.909 0l-.856.856 2.17 2.17.856-.856a.643.643 0 0 0 0-.909l-1.261-1.261z"/></svg>';
//     profileChangeButtonPic.innerHTML = svg1;
//     let profileChangeButtonText = document.createElement('div');
//     profileChangeButtonText.classList.add("profile_change_button_text");
//     profileChangeButtonText.textContent = "Изменить";


//     profileChangeButton.appendChild(profileChangeButtonPic);
//     profileChangeButton.appendChild(profileChangeButtonText);
//     profileDataFooter.appendChild(profileChangeButton);

//     let profileDeleteButton = document.createElement('a');
//     profileDeleteButton.classList.add("profile_delete_button");
//     profileDeleteButton.href = "#";
//     let profileDeleteButtonPic = document.createElement('div');
//     profileDeleteButtonPic.classList.add("profile_delete_button_pic");
//     let svg2 = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M12.437 6a.463.463 0 0 1 .464.489l-.367 6.679c0 1.104-.914 1.84-2.018 1.84H5.548c-1.103 0-2.017-.686-2.017-1.79l-.436-6.724A.462.462 0 0 1 3.558 6h8.879zM2.128 5a.529.529 0 0 1-.531-.525l.001-.012c0-.414.251-.769.608-.922.455-.241 1.681-.439 3.292-.542V1.41C5.498.632 6.13 0 6.908 0h2.184c.778 0 1.41.632 1.41 1.41v1.589c1.611.103 2.837.301 3.292.542.357.153.608.508.608.922 0 .297-.24.537-.537.537H2.128zm6.571-3.407H7.301A.301.301 0 0 0 7 1.894v1.041a46.454 46.454 0 0 1 2 0V1.894a.301.301 0 0 0-.301-.301z"/></svg>';
//     profileDeleteButtonPic.innerHTML = svg1;
//     let profileDeleteButtonText = document.createElement('div');
//     profileDeleteButtonText.classList.add("profile_delete_button_text");
//     profileDeleteButtonText.textContent = "Удалить";

//     profileDeleteButton.appendChild(profileDeleteButtonPic);
//     profileDeleteButton.appendChild(profileDeleteButtonText);
//     profileDataFooter.appendChild(profileDeleteButton);
    
//     container.appendChild(profileDataFooter);
//     application.appendChild(container);
//     let listDivs = [{}];
//     if (me) {
//         const listDivs = [
//             {left: "Никнейм", right: "${me.nick}"},
//             {left: "Email", right: "${me.email}"},
//             {left: "Очки", right: "${me.score}"},
//             {left: "KDA", right: "${me.kda}"},
//         ];
//     } else {
// 		AjaxModule.doGet({
// 			callback(xhr) {
// 				if (!xhr.responseText) {
// 					alert('Unauthorized');
// 					application.innerHTML = '';
// 					createNavbarProfile();
// 					return;
// 				}

// 				const user = JSON.parse(xhr.responseText);
// 				application.innerHTML = '';
// 				renderProfilePage(user);
// 			},
// 			path: '/me',
// 		});
// 	}
    
//     let tmp_schet = 1;
//     listDivs.forEach(item =>{
//         let profileData = document.createElement('div');
//         profileData.classList.add("profile_data_" + tmp_schet++);
//         let profileDataBottomBorderDiv = document.createElement('div');
//         profileDataBottomBorderDiv.classList.add("profile_data_bottom_border_div");

//         let left = document.createElement('div');
//         left.classList.add("left_data");
//         left.textContent = item.left;

//         let right = document.createElement('div');
//         right.classList.add("right_data");
//         right.textContent = item.right;

//         profileDataBottomBorderDiv.appendChild(left);
//         profileDataBottomBorderDiv.appendChild(right);
//         profileData.appendChild(profileDataBottomBorderDiv);
//         profileContainerGridblock.appendChild(profileData);
//     })
// }