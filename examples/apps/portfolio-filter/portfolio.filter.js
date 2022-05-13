

(function() {

	/**
	 * This code will enable automatically all the filter.
	 *
	 * @type {NodeListOf<Element>}
	 */
	var aux = document.querySelectorAll('.folio-filter');
	Array.from(aux).map(function(e) {
		enablePortfolioFilter(e.id)
	})

})();

function createPortfolioFilterButton(slug) {
	/**
	 * This code inserts the filter buttons.
	 *
	 * @type {HTMLAnchorElement}
	 */
	var a = document.createElement("a");
	var text = document.createTextNode(slug)
	a.appendChild(text)
	a.classList.add("btn");
	a.setAttribute("data-role", slug)
	a.setAttribute("role", "button")
	a.setAttribute("href", '#')
	return a
}

function enablePortfolioFilter(id) {
	/**
	 * This function enables the portfolio functionality.
	 *
	 * To work the html should be structured like this for a
	 * folio of, lets say, <roles>. To have another portafolio
	 * just a different portolio id (e.g. <names>).
	 *
	 *     <div id="roles" class="folio-filter">
     *         <div class="filter-list"></div>
     *     </div>
	 *
	 *
	 *     <div class="row folio roles">
     *
     *         <div class="col-md-4" data-roles="role1 role2">
     *              <div class="card mb-2 box-shadow">
     *                   CARD 1
     *              </div>
     *         </div>
     *
     *         <div class="col-md-4" data-roles="role2 role3">
     *              <div class="card mb-2 box-shadow">
     *                    CARD 2
     *              </div>
     *         </div>
	 *     </div>
	 *
	 * @type {string}
	 */
	// Create variables.
	filter = document.querySelector('#' + id + '.folio-filter');
	folio = document.querySelectorAll('.folio.' + id + ' > div');

	// Get all portfolio tags
	tags = new Set(Array.from(folio)
			.map(function(elem) {
				return elem.getAttribute('data-roles')
						   .trim().split(/\s+/);
		}).flat(2));

	// Populate portfolio filter button list
	var aux = document.querySelector('#' + id + '.folio-filter > .filter-list')
	aux.appendChild(createPortfolioFilterButton('all'))
	tags.forEach(function(t) {
		aux.appendChild(createPortfolioFilterButton(t))
	})

	var filters = document.querySelectorAll('#' + id + '.folio-filter > .filter-list a')


	if(filter) {

		filters.forEach(function(elem) {
			elem.addEventListener('click', function(e) {

				// Constants
				var i=150; // This is the timeout
				var filterRole = this.getAttribute('data-role');

				if(filterRole == "all") {
					var selectedFolio = e.currentTarget.folio_;
				} else {
					var query = "." + e.currentTarget.id_ +" [data-roles*='"+ filterRole +"']";
					var selectedFolio = document.querySelectorAll(query);
				}

				// Hide all
				e.currentTarget.filters_.forEach(function(elem) {
					elem.classList.remove('selected');
				});

				// Hide all cards
				e.currentTarget.folio_.forEach(function(elem) {
					elem.classList.add('hidden');
					elem.setAttribute('aria-hidden', true);
				});

				// Show selected cards
				selectedFolio.forEach(function(elem) {
					setTimeout(function() {
						elem.classList.remove('hidden');
						elem.setAttribute('aria-hidden',false);
					}, i);
					i = i + 125;
				});

				// Mark as selected
				this.classList.add('selected');

				// Prevent default
				e.preventDefault();
			});

			// Pass variables.
			elem.filters_ = filters;
			elem.folio_ = folio;
			elem.id_ = id;
		});
	}
}