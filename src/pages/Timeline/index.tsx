import React, { useCallback, useEffect, useRef, useState } from 'react';
import Layout from 'components/Layout';
import { useAppSelector } from 'hooks/reduxHooks';
import { API_SOURCE_URL } from 'common/constants';
import './styles.scss';
import { Link } from 'react-router-dom';

interface IAlbums {
  id: number;
  title: string;
  photos: [
    {
      albumId: number;
      id: number;
      title: string;
      url: string;
      thumbnailUrl: string;
    }
  ];
}

const TimelinePage = () => {
  const { user } = useAppSelector((state) => state.user);

  const [albums, setAlbums] = useState<IAlbums[]>([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer: any = useRef();
  const intersectingRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const getPhotos = (page: number) => {
    setLoading(true);
    const url = `${API_SOURCE_URL}/albums?userId=${user?.id}&_page=${page}&_limit=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          (data as []).forEach(({ id, title }) => {
            const url = `${API_SOURCE_URL}/photos?albumId=${id}&_limit=10`;
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                if (data.length > 0) {
                  setAlbums((albums) => [
                    ...albums,
                    { id: id, title: title, photos: data },
                  ]);
                }
              });
          });
        }
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  };

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    getPhotos(page);
  }, [user, page]);

  return (
    <Layout>
      <div className="timeline__hero">
        <h1>{user?.name}</h1>
      </div>
      <div className="container timeline">
        {albums?.map(({ id, title, photos }) => (
          <Link to={`/albums/${id}`} key={id}>
            <div className="timeline__albumContainer">
              <div>
                <div
                  className="timeline__albumCover"
                  style={{
                    backgroundImage: `url('${photos[0].thumbnailUrl}`,
                  }}
                />
              </div>

              <div className="timeline__albumContent">
                <h3 className="timeline__albumName">{title}</h3>
                <div className="timeline__albumThumbnailContainer">
                  {photos?.map(({ id, thumbnailUrl }) => (
                    <div
                      key={id}
                      className="timeline__albumThumbnails"
                      style={{
                        backgroundImage: `url('${thumbnailUrl}')`,
                      }}
                    />
                  ))}
                  <div className="timeline__moreThumbnails">...</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <div className="loadmore" ref={intersectingRef}></div>
      </div>
    </Layout>
  );
};

export default TimelinePage;
