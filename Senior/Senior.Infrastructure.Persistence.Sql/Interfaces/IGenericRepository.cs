using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Senior.Infrastructure.Persistence.Sql.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<TEntity> GetSingleByFilter(Expression<Func<TEntity, bool>> filter, string includeProperties = "");
        Task<List<TEntity>> Get(Expression<Func<TEntity, bool>> filter = null,
       Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, string includeProperties = "");
        Task<TEntity> Insert(TEntity entity);
        Task<int> Update(TEntity entity);
        Task<bool> SaveChanges();

    }
}
