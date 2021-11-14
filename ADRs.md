<ol>
    <li dir="ltr">
        <p dir="ltr">
            Programming Language
        </p>
    </li>
    <ol>
        <li dir="ltr">
            <p dir="ltr">
                Summary
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    In order to create our software in a language the whole
                    team understands and can work with, we have decided to
                    use Python as our programming language.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Problem
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    The problem is that in order for us to best create this
                    software, we have to use a language that both we
                    understand, and one that future developers who may work
                    with this software will understand. If this issue is
                    not correctly solved, it will hinder all future
                    development work and handicap the project as a whole.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Constraints
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    For our programming language, the client prefers an
                    open source language. An assumption correlated to this
                    decision is that our client does not foresee there
                    being many layers of functionality added to this
                    project, which could be reason to have picked a
                    language more suited for efficiency and threading.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Options
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    The candidate solutions are Java, Javascript, and
                    Python. The pros of Java are that the whole team has
                    experience with it, it supports threading which could
                    be of future use, it runs on the JVM, java virtual
                    machine, such that as long as the JVM is installed, it
                    can be run on any machine, and it is faster than other
                    languages like Python. The cons for Java are that it is
                    far less readable than other languages like Python and
                    Javascript, and it has been surpassed in popularity by
                    Python. The pros for Javascript are that it allows
                    frontend and backend to be written in the same
                    language, and it is readable. The cons are that there
                    are better choices for the frontend, and Javascripts
                    support for backends is relatively new such that it has
                    less to offer for the backend than Python or Java. The
                    pros of Python are that it is very readable, it is open
                    source and has a wide community of developers who
                    constantly post about solutions to issues, it has an
                    extensive plethora of libraries for all sorts of
                    functionalities, and it supports asynchronous coding.
                    The cons for Python are that it is not the fastest
                    language in terms of performance, run time errors can
                    often occur due to it being a dynamically typed
                    language, and it is not a multithreaded language.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Rationale
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    We decided on Python as our solution because this
                    project does not call for overly complex operations or
                    multithreading. With the many libraries and posts on
                    various aspects of Python, along with its easy
                    readability, it was the optimal choice for our team.
                </p>
            </li>
        </ol>
    </ol>
    <li dir="ltr">
        <p dir="ltr">
            Framework
        </p>
    </li>
    <ol>
        <li dir="ltr">
            <p dir="ltr">
                Summary
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    In order to create a full stack web application that
                    can communicate with a database, make queries, and have
                    APIs all on the backend, along with a fully functioning
                    front end, we decided to use Django.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Problem
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    The problem centers around creating an application that
                    has a front end, backend, and a connection to a
                    database, and allows for each part to easily and
                    seamlessly communicate. Without a framework solution to
                    this problem, development would become much slower as
                    we would have to recreate the wheel on many issues that
                    frameworks solve, such that this decision is a very
                    important one.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Constraints
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    For our framework, the client strongly prefers not to
                    pay for one. An assumption related to this decision is
                    that our client wants the frontend, backend, and APIs
                    all packed into one singular application.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Options
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    Since before deciding on a framework, we already
                    decided on Python, we narrowed our options to Python
                    frameworks. With that in mind, our candidate solutions
                    are Flask and Django. The pros of flask are that it
                    offers flexibility for developers, it has greater
                    database support than Django, and is easier for smaller
                    applications. The cons of Flask are that it is not very
                    suitable for large, complex projects with lots of
                    dynamic pages, there is not a ton of community support,
                    and its flexibility makes it harder for
                    “less-experienced” developers. The pros of Django are
                    that it is ideal for fast development, as it can
                    streamline many smaller aspects of full stack
                    applications, it is a full stack python framework, and
                    it is designed to be scalable and secure. The cons of
                    Django are that it can be a little rigid when it comes
                    to integrating other languages into the frontend, the
                    Django ORM requires additional learning than normal
                    queries, and the applications connection to its
                    database is harder to customize.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Rationale
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    We decided on Django as our solution because of the way
                    it can streamline development. Everyone on our team is
                    relatively inexperienced with full stack web
                    development so Django’s many default settings and
                    behaviors are optimal for us. Also, Django’s support
                    for security was an important driver in our decision,
                    along with the other pros it brings to the table.
                </p>
            </li>
        </ol>
    </ol>
    <li dir="ltr">
        <p dir="ltr">
            Database
        </p>
    </li>
    <ol>
        <li dir="ltr">
            <p dir="ltr">
                Summary
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    In order to store data persistently and in a structured
                    format, we have decided to use PostgresSQL.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Problem
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    We need a database that can store pairs of data that
                    can be accessed quickly and in a format that can be
                    easily parsed by Django. We also wanted to keep our
                    possibilities open beyond having data that is only
                    stored in unique key-value pairs.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Constraints
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    For a database management system, our client wants
                    different users to be able query single values from a
                    table quickly and accurately. They also were interested
                    in moving past simple data pairs that their original
                    data is stored in.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Options
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    In terms of compatibility with Django and having a
                    structured database, we immediately decided to use a
                    SQL database management system (DBMS) over a NoSQL
                    system such as MongoDB. Natively, Django uses SQLite
                    for databases. SQLite does not perform as well as other
                    database platforms when it comes to larger sets of
                    data. It also lacks some concurrency, or the ability of
                    different processes to make changes to the database at
                    a time. This is because the database is accessed
                    directly from the disk in a single file rather than
                    through a server. This aspect of the system is also why
                    SQLite does not offer support for users with different
                    access permissions. For these reasons, and wanting the
                    ability to store more complex databases, we chose
                    PostgresSQL.
                </p>
            </li>
        </ol>
        <li dir="ltr">
            <p dir="ltr">
                Rationale
            </p>
        </li>
        <ol>
            <li dir="ltr">
                <p dir="ltr">
                    We decided on PostgresSQL because of its data
                    integrity, easy integration, and ability to perform
                    more complex operations.
                </p>
            </li>
        </ol>
    </ol>
</ol>
