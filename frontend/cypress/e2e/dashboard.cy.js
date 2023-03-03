describe('manage album & songs', () => {
    it('user should be able to manage owned albums and songs', () => {
        //     open application
        cy.visit('http://127.0.0.1:5173')
        //     login if already registered
        cy.findByRole('link', {name: /sign in/i}).click()
        cy.findByRole('textbox', {name: /email/i}).type('admin@example.com')
        cy.wait(1000);
        cy.findByTitle(/password/i).type('Admin@1234')
        cy.wait(1000);
        cy.findByRole('button', {name: /sign in/i}).click()
        cy.wait(4000);
        cy.findByRole('link', {name: /dashboard dashboard manage your albums and songs/i}).click({force: true})
        //     click add album
        cy.wait(5000);
        cy.findByRole('button', {name: /add new album/i}).click()
        cy.wait(2000);
        //     fill details and click submit
        // upload image
        // const filepath = 'img/city-profile.jpg'
        // cy.get('input[type="file"]').selectFile(filepath, {subjectType: 'input'})
        // cy.findByRole('textbox', {name: /album_title/i}).type('Sample Album')
        // cy.findByRole('textbox', {name: /description/i}).type('Sample Description')
        // cy.findByRole('textbox', {name: /releaseDate/i}).type('2022-10-03')
        cy.get('body > div:nth-child(18) > div').click({force: true})
        //     click edit button
        cy.findByRole('button', {name: /edit edit/i}).click()
        cy.wait(5000);
        //     update image, title , desription and release date
        //     click albums nav item
        cy.findByRole('heading', {name: /albums/i}).click()
        //     click manage songs
        cy.wait(2000);
        cy.findByRole('button', {name: /audiotrack manage songs/i}).click()
        //     add songs
        cy.wait(3000);
        cy.findByRole('button', {name: /add new song/i}).click()
        cy.wait(2000);
        cy.get('body > div:nth-child(20) > div').click({force: true})
        // cy.findByRole('combobox', {name: /select genre/i}).select('3')
        // cy.findByRole('dialog', {
        //      name: /modal "create new album"/i
        //  }).findByRole('button').click({force: true});
        cy.wait(2000);
        cy.findByRole('heading', {name: /manage album/i}).click({force: true})
        //     update song
        cy.wait(1000);
        cy.findByRole('button', {name: /edit edit/i}).click();
        // cy.findByRole('combobox', {name: /select genre/i}).select('1')
        cy.wait(3000);
        cy.findByRole('heading', {name: /albums/i}).click()
        //     goto home and view created album and songs
        cy.wait(2000);
        cy.findByRole('link', {name: /go to homepage/i}).click()
        cy.wait(2000);
        cy.findByText(/view album/i).click()
        cy.wait(2000);
        cy.findByRole('heading', {name: /albums/i}).click({force: true})
        cy.wait(2000);
        cy.findByRole('tab', {name: /genres/i}).click({force: true})
        cy.wait(2000);
        // view songs by genre
        cy.findByRole('heading', {name: /pop/i}).click()
        cy.wait(2000);
        cy.findByRole('heading', {name: /home/i}).click()
        cy.wait(2000);
        cy.findByRole('tab', {name: /songs/i}).click({force: true})
        //     navigate to dashboard
        cy.wait(2000);
        cy.findByRole('link', {name: /dashboard dashboard manage your albums and songs/i}).click({force: true})
        //     delete song
        cy.wait(3000);
        cy.findByRole('button', {name: /audiotrack manage songs/i}).click()
        cy.wait(3000);
        cy.findByRole('row', {name: /title: sample2 genre: 3 3mins edit edit delete delete/i}).findByRole('button', {name: /delete delete/i}).click({force: true});
        cy.wait(3000);
        //     delete album
        cy.findByRole('heading', {name: /albums/i}).click()
        cy.wait(2000);
        cy.findByRole('button', {name: /delete delete/i}).click()
        cy.wait(3000);
        cy.findByRole('heading', {name: /logout logout/i}).click({force: true})
    })
})
