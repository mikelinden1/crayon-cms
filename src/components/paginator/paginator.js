import React from 'react';
import PropTypes from 'prop-types';

export default class Paginator extends React.PureComponent {
    static propTypes = {
        currentPage: PropTypes.number.isRequired,
        numOfItems: PropTypes.number.isRequired,
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            setCurrentPage: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { currentPage, numOfItems, config, actions: { setCurrentPage } } = this.props;
        const { itemsPerPage, capabilities: { reorderable } } = config;

        if (!itemsPerPage || reorderable) {
            return null;
        }

        const numOfPages = Math.ceil(numOfItems / itemsPerPage);

        if (currentPage > numOfPages) {
            setCurrentPage(currentPage - 1);
        }

        const onFirstPage = currentPage === 1;
        const onLastPage = currentPage === numOfPages;

        if (numOfPages <= 1 || !itemsPerPage) {
            return null;
        }

        return (
            <div style={{margin: '20px 0'}}>
                <ul className="pagination" style={{justifyContent: 'center'}}>
                    <li className={onFirstPage ? 'page-item disabled' : 'page-item'}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={onFirstPage}>&laquo;</button>
                    </li>
                    {
                    [...Array(numOfPages)].map((e, i) => {
                        return (
                            <li key={`paginator-link-${i}`} className={i === currentPage - 1 ? 'page-item active' : 'page-item'}>
                                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            </li>
                        );
                    })
                    }
                    <li className={onLastPage ? 'page-item disabled' : 'page-item'}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={onLastPage}>&raquo;</button>
                    </li>
                </ul>
            </div>
        );
    }
}