/** ****************************************
 * Project: js-capstone
 * File: index.js
 * Created: 3/20/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>, Anita Sharma<sharma.anita00001@gmail.com>
 ****************************************** */
import './css/home.css';
import './css/apps.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all.min';
import Apps from './modules/Apps';
import Involvement from './modules/Involvement';
import fetchArtworks from './modules/artworks';
import countItem from './modules/countItem';

const gridView = document.getElementById('grid-view');

// IDs of artworks to display
const artworkIds = [43867, 43869, 62055, 44426, 27608, 39304];
const maxTitleLength = 20;

const displayArtworks = async () => {
  const artworks = await fetchArtworks(artworkIds);

  const artworksContainer = document.getElementById('artworks');
  artworks.forEach((artwork) => {
    // Trim title if it is too long
    const title = artwork.title.length > maxTitleLength
      ? `${artwork.title.slice(0, maxTitleLength)}...`
      : artwork.title;

    artworksContainer.innerHTML += `
      <article id="thumbnail">
        <div class='image'><img src="${artwork.imageUrl}" alt="${artwork.title}"></div>
        <div id="desc">
          <p>${title}</p>
          <button id="heart"><i class="fa-regular fa-heart"></i></button>
        </div>
        <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="comments" data-id="${artwork.id}" class="btn btn-outline-success text-dark">Comments</button>
        <button id="reservation" data-id="${artwork.id}" class="btn btn-outline-secondary text-dark">Reservation</button>
      </article>
    `;
    gridView.appendChild(artworksContainer);
  });
  // code for displaying artworks
  const paintingCount = countItem();
  const paintingCountElem = document.getElementById('painting-count');
  paintingCountElem.innerHTML = `(${paintingCount})`;
};

window.addEventListener('load', () => {
  displayArtworks();
  const gallery = new Apps();
  gallery.fakeFn();
  const $activity = new Involvement();
  const data = $activity.getComments();
  console.log('Index: ', data);
});
