import React, { useCallback, useEffect, useState } from 'react';
import Layout from 'components/Layout';
import { API_SOURCE_URL } from 'common/constants';
import './styles.scss';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';

interface IParams {
  albumId: string;
}

interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

interface IPhotos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const AlbumDetailsPage = () => {
  const { albumId } = useParams<IParams>();
  const { user } = useAppSelector((state) => state.user);
  const [album, setAlbum] = useState<IAlbum>();
  const [photos, setPhotos] = useState<IPhotos[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAlbum = () => {
      setLoading(true);
      const url = `${API_SOURCE_URL}/photos?albumId=${albumId}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setAlbum(data[0]);
          }
        })
        .catch((err) => console.log(err.message));
    };
    const getPhotos = () => {
      setLoading(true);
      const url = `${API_SOURCE_URL}/photos?albumId=${albumId}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setPhotos(data);
          }
        })
        .catch((err) => console.log(err.message));
    };
    getAlbum();
    getPhotos();
  }, [albumId]);
  return (
    <Layout>
      <div className="container albums">
        {album?.title && (
          <div className="albums__header">
            <h1>{album.title}</h1>
          </div>
        )}
        <div className="albums__container">
          {photos.map(({ id, title, url, thumbnailUrl }) => (
            <div className="albums__photo" key={id}>
              <img src={url} alt="" />
              <h3 className="album__photoTitle">{title}</h3>
            </div>
          ))}
        </div>
        Album Details {albumId}
      </div>
    </Layout>
  );
};

export default AlbumDetailsPage;
